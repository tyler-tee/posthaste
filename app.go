package main

import (
	"context"
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