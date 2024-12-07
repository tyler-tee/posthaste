package main

import (
	"embed"
	"log"
	"os"
	"posthaste/backend"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Initialize DynamoDB client
	backend.InitDynamoDB()

	// If needed, you can test backend functionality without directly accessing dbClient
	// Example: Fetch all posts to verify initialization
	_, err := backend.GetAllPosts()
	if err != nil {
		log.Fatalf("Failed to fetch posts: %v", err)
	}

	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "PostHaste",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
		os.Exit(1)
	}
}