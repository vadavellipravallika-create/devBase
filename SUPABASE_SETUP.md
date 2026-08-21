# DevBase Supabase Setup Guide

This guide covers how to initialize your Supabase project and apply the initial schema migrations.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed locally
- Docker (for running Supabase locally)
- A Supabase account (if deploying to production)

## Local Development Setup

1. **Initialize Supabase in this project:**
   Run the following command in the root of `DevBase`:
   ```bash
   supabase init
   ```
   *(Note: This creates the `supabase/` directory if you haven't run it yet.)*

2. **Start Supabase Locally:**
   Make sure Docker is running, then execute:
   ```bash
   supabase start
   ```
   This will spin up a local instance of Supabase Studio, Postgres, and the API gateways.

3. **Apply Migrations:**
   The `supabase/migrations/` directory contains the initial SQL script which defines your tables and relations. It is automatically applied when you start Supabase locally. To force a reset or apply new migrations, run:
   ```bash
   supabase db reset
   ```

## Production Deployment

1. **Link your Supabase Project:**
   ```bash
   supabase link --project-ref <your-project-ref>
   ```

2. **Push Migrations to Production:**
   ```bash
   supabase db push
   ```

## Schema Details

This schema includes support for the following DevBase core features:

- **Core Platform:** Role-based access (`student`, `admin`).
- **ExamScope:** Revisions and Question Banks via `exam_modules` and `exam_questions`.
- **FixMyCode:** Source code debugging sessions containing `jsonb` fields for Gemini analysis via `debug_sessions`.
- **RoleReady:** JSONB skills extraction from user resumes and 7-day micro-learning roadmaps via `user_resumes` and `learning_roadmaps`.
