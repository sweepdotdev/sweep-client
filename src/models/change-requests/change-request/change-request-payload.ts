export interface ChangeRequestPayload {
    id: string;
    initiator_account_id: string;
    num_jobs_enqueued: number;
    organization_id: string;
    status: "pending" | "in_progress" | "completed";
    created_at: string;
    last_updated_at: string;
    package_manager_software: string;
    package_manager_version: string;
    command: string;
    eligible_git_namespaces: string[];
    custom_branch_name: string;
    custom_commit_message: string;
    custom_pull_request_title: string;
    dry_run: boolean;
}
