package main

import (
	"context"
	"errors"
	"log"
	"posthaste/backend"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	log.Println("App has started")
}

// GetAllPosts fetches posts from the backend
func (a *App) GetAllPosts() ([]backend.Post, error) {
	return backend.GetAllPosts()
}

// AddPost adds a new article to DDB from the UI
func (a *App) AddPost(post backend.Post) error {
	return backend.AddPost(post)
}

func (a *App) UpdatePost(post backend.Post) error {
    // Validate if required
    if post.ID == "" {
        return errors.New("post ID is required to update a post")
    }
    return backend.UpdatePost(post)
}