package backend

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
    "github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"

	"github.com/google/uuid"
)

// DynamoDB client
var dbClient *dynamodb.Client

// Post struct to map to the DynamoDB schema
type Post struct {
	ID          string `json:"id" dynamodbav:"id"`
	PublishDate string `json:"publish_date" dynamodbav:"publish_date"`
	Category    string `json:"category" dynamodbav:"category"`
	Content     string `json:"content" dynamodbav:"content"`
	Published   bool   `json:"published" dynamodbav:"published"`
	Slug        string `json:"slug" dynamodbav:"slug"`
	Tags        string `json:"tags" dynamodbav:"tags"`
	Title       string `json:"title" dynamodbav:"title"`
}

// Initialize DynamoDB client
func InitDynamoDB() {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-2"))
	if err != nil {
		log.Fatalf("Unable to load AWS config: %v", err)
	}

	dbClient = dynamodb.NewFromConfig(cfg)
	log.Println("DynamoDB client initialized")
}

// Fetch all posts
func GetAllPosts() ([]Post, error) {
	result, err := dbClient.Scan(context.TODO(), &dynamodb.ScanInput{
		TableName: aws.String("articles"),
	})
	if err != nil {
		return nil, fmt.Errorf("failed to scan articles table: %w", err)
	}

	var posts []Post
	for _, item := range result.Items {
		var post Post
		err := attributevalue.UnmarshalMap(item, &post)
		if err != nil {
			log.Printf("Unmarshal failed for item: %v, error: %v\n", item, err)
			continue
		}
		posts = append(posts, post)
	}
	return posts, nil
}

// Add a new post
func AddPost(post Post) error {
    // Generate a unique UUID for the new post
    post.ID = uuid.New().String()

    // Validation: Ensure required fields are provided
    if post.Title == "" || post.Content == "" {
        return errors.New("title and content are required")
    }

    // Set default publish_date to today's date if not provided
    if post.PublishDate == "" {
        post.PublishDate = time.Now().Format("2006-01-02") // Format as YYYY-MM-DD
    }

    // Marshal post into DynamoDB-compatible format
    item, err := attributevalue.MarshalMap(post)
    if err != nil {
        return fmt.Errorf("failed to marshal post: %w", err)
    }

    // Add the item to the DynamoDB table
    _, err = dbClient.PutItem(context.TODO(), &dynamodb.PutItemInput{
        TableName: aws.String("articles"),
        Item:      item,
    })
    if err != nil {
        return fmt.Errorf("failed to add post: %w", err)
    }

    return nil
}

// Fetch a post by ID
func GetPostByID(id string) (*Post, error) {
	result, err := dbClient.GetItem(context.TODO(), &dynamodb.GetItemInput{
		TableName: aws.String("articles"),
		Key: map[string]types.AttributeValue{
			"id": &types.AttributeValueMemberS{Value: id},
		},
	})
	if err != nil {
		return nil, fmt.Errorf("failed to get post by ID: %w", err)
	}

	if result.Item == nil {
		return nil, fmt.Errorf("post with ID %s not found", id)
	}

	var post Post
	err = attributevalue.UnmarshalMap(result.Item, &post)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal post: %w", err)
	}
	return &post, nil
}

// Update a post
func UpdatePost(post Post) error {
	item, err := attributevalue.MarshalMap(post)
	if err != nil {
		return fmt.Errorf("failed to marshal post: %w", err)
	}

	_, err = dbClient.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String("articles"),
		Item:      item,
	})
	if err != nil {
		return fmt.Errorf("failed to update post: %w", err)
	}
	return nil
}