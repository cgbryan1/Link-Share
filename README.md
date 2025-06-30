# Angular Demo Project (COMP 423)

A modern web application for sharing content through shortened URLs or text snippets. Built with FastAPI, Angular, and deployed using OKD and GitHub Pages, this tool provides a seamless experience for both content sharers and viewers while giving administrators visibility and control over shared content. Created in part with [Katie Brown](https://github.com/kgbrown5).

Check out the Github pages frontend [here](https://comp423-25s.github.io/ex02-link-share-cgbryan1/#/resources)!

## Overview

Link Share enables users to:

* Create shortened URLs or text snippets

* Customize vanity links

* Retrieve content via a single opaque endpoint (e.g. /abc123)

* View and manage all active resources as an admin

## Tech Stack

| Stack          | Tools                                                           |
| -------------- | --------------------------------------------------------------- |
| **Frontend**   | Angular, TypeScript, Signals, HttpClient, Routing, GitHub Pages |
| **Backend**    | FastAPI, Pydantic, RESTful API Design                           |
| **Deployment** | OKD (backend), GitHub Actions & Pages (frontend)                |
| **Other**      | RxJS, CI/CD, CORS, Pair Programming                             |


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.

## Personas & User Stories

We used personas and corresponding user stories to drive our project - this kept our program user-oriented and prevented scope creep!

Sue Sharer's stories
* Create a new text snippet
* Create a new shortened URL

Cai Clicker's stories:
* Acess content via opaque links (e.g., /a7Hq9L)
* Automatically redirected or shown snippet based on content type
  
Amy Admin's stories:
* View list of all active resources (URLs + snippets)
* View access counts for each resource
* Update or delete any active resource

## System Architecture

### API Endpoints
All endpoints are grouped by persona via openapi_tags:

* /share/snippet → Create a snippet

* /share/url → Shorten a URL

* /{resource_identifier} → Shared retrieval path for both

* /admin/resources → Get all resources

* /admin/resources/{id} → Update or delete a resource

All routes are documented using OpenAPI with field descriptions, request/response models, and sample inputs.

This portion of the project was created with [Katie Brown](https://github.com/kgbrown5).

### Angular Frontend (Phase 2)

✅ ShareComponent
* Form to create either a snippet or shortened URL

* Calls Angular Service to submit data to backend

* Uses HttpClient.post and returns Observable<string>


✅ API Service
* Injected into components with Angular Dependency Injection
* Uses RxJS to simulate and later replace fake data with real API calls
* Centralizes API logic for reusability

✅ ResourceListComponent (for Amy Admin)
* Fetches all current resources from the API
* Displays them in a signal-bound table
* Shows a link path (clickable), type (snippet or redirect), view count, and buttons to update or delete

✅ Routing and Navigation
* Added route to /admin

* Navigation bar links to Share and Admin views

* app.routes.ts configured with lazy routing


## Deployment

Backend
* Deployed to OKD cluster

* Handles all CORS and REST API traffic

Frontend
* Auto-deployed via GitHub Actions

* Published with GitHub Pages from the gh-pages branch
  

You can enable GitHub Pages in your repo settings and view the live demo at: https://<your-username>.github.io/<your-repo-name>
