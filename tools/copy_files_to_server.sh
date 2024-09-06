#!/bin/bash

# Variables
USER="matt"
SERVER="192.168.0.68"
REMOTE_DIR="/home/matt/website/"
LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.."
echo $LOCAL_DIR
REMOTE_SCRIPT="/home/matt/website/tools/info_board_refresh.sh"

# Copy files to the server
scp -i ~/.ssh/infoboard_local -r $LOCAL_DIR/index.html $USER@$SERVER:$REMOTE_DIR
scp -i ~/.ssh/infoboard_local -r $LOCAL_DIR/scripts/* $USER@$SERVER:$REMOTE_DIR/scripts
scp -i ~/.ssh/infoboard_local -r $LOCAL_DIR/css/* $USER@$SERVER:$REMOTE_DIR/css
scp -i ~/.ssh/infoboard_local -r $LOCAL_DIR/images/* $USER@$SERVER:$REMOTE_DIR/images
scp -i ~/.ssh/infoboard_local -r $LOCAL_DIR/data/* $USER@$SERVER:$REMOTE_DIR/data
# Execute the script on the remote server
ssh -i ~/.ssh/infoboard_local $USER@$SERVER "bash $REMOTE_SCRIPT"
