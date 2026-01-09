#!/bin/bash

# Git Automation Script: Push from current branch to main, then to origin/main
# Usage: ./git-push-to-main.sh "Your commit message"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if commit message is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide a commit message${NC}"
    echo "Usage: ./git-push-to-main.sh \"Your commit message\""
    exit 1
fi

COMMIT_MESSAGE="$1"
CURRENT_BRANCH=$(git branch --show-current)

echo -e "${YELLOW}Current branch: $CURRENT_BRANCH${NC}"

# Step 1: Add all changes
echo -e "${GREEN}Step 1: Adding all changes...${NC}"
git add .
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to add changes${NC}"
    exit 1
fi

# Step 2: Commit changes
echo -e "${GREEN}Step 2: Committing changes...${NC}"
git commit -m "$COMMIT_MESSAGE"
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}No changes to commit or commit failed${NC}"
    # Continue anyway in case we just need to merge
fi

# Step 3: Switch to main branch
echo -e "${GREEN}Step 3: Switching to main branch...${NC}"
git checkout main
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to checkout main branch${NC}"
    exit 1
fi

# Step 4: Pull latest changes from origin/main
echo -e "${GREEN}Step 4: Pulling latest changes from origin/main...${NC}"
git pull origin main
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to pull from origin/main${NC}"
    exit 1
fi

# Ensure clean working tree on main
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo -e "${RED}Main branch has uncommitted changes. Aborting merge.${NC}"
    git status
    exit 1
fi

# Step 5: Merge current branch into main
echo -e "${GREEN}Step 5: Merging $CURRENT_BRANCH into main...${NC}"
git merge $CURRENT_BRANCH
if [ $? -ne 0 ]; then
    echo -e "${RED}Merge conflict detected! Please resolve conflicts manually${NC}"
    exit 1
fi

# Step 6: Push to origin/main
echo -e "${GREEN}Step 6: Pushing to origin/main...${NC}"
git push origin main
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push to origin/main${NC}"
    exit 1
fi

# Step 7: Switch back to original branch
echo -e "${GREEN}Step 7: Switching back to $CURRENT_BRANCH...${NC}"
git checkout $CURRENT_BRANCH
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Warning: Failed to switch back to $CURRENT_BRANCH${NC}"
fi

echo -e "${GREEN}✓ Successfully pushed changes to main and origin/main!${NC}"
echo -e "${YELLOW}You are now back on branch: $(git branch --show-current)${NC}"