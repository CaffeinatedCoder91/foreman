CREATE TYPE "public"."pr_status" AS ENUM('reviewing', 'clear', 'flagged', 'stale');--> statement-breakpoint
CREATE TYPE "public"."specialist_type" AS ENUM('a11y', 'performance', 'security', 'tests');--> statement-breakpoint
CREATE TYPE "public"."verdict" AS ENUM('clear', 'flagged');--> statement-breakpoint
CREATE TABLE "pull_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"repo_id" text NOT NULL,
	"number" integer NOT NULL,
	"title" text NOT NULL,
	"status" "pr_status" NOT NULL,
	"head_sha" text NOT NULL,
	"opened_at" timestamp with time zone NOT NULL,
	"last_reviewed_at" timestamp with time zone,
	"closed_at" timestamp with time zone,
	CONSTRAINT "pull_requests_repo_number_unique" UNIQUE("repo_id","number")
);
--> statement-breakpoint
CREATE TABLE "repos" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"name" text NOT NULL,
	"github_installation_id" text NOT NULL,
	"connected_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "specialist_results" (
	"id" text PRIMARY KEY NOT NULL,
	"pull_request_id" text NOT NULL,
	"specialist" "specialist_type" NOT NULL,
	"verdict" "verdict" NOT NULL,
	"summary" text NOT NULL,
	"reviewed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pull_requests" ADD CONSTRAINT "pull_requests_repo_id_repos_id_fk" FOREIGN KEY ("repo_id") REFERENCES "public"."repos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specialist_results" ADD CONSTRAINT "specialist_results_pull_request_id_pull_requests_id_fk" FOREIGN KEY ("pull_request_id") REFERENCES "public"."pull_requests"("id") ON DELETE no action ON UPDATE no action;