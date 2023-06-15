#!/bin/bash
#
# Sign into ECR, build the image, and push it to ECR with latest tag

#######################################
# Cleanup docker image that has been temporarily created
# Globals:
#   None
# Arguments:
#   None
#######################################
function cleanup() {
  echo "🗑️ Removing the temporarily created image ..."
  docker rmi 671093793941.dkr.ecr.$AWS_TOKYO_REGION.amazonaws.com/ajktown/wordnote:latest
}

# It is a must as this script is contained with the directory "script"
cd ..

echo "👀 Signing into ECR ..."
AWS_TOKYO_REGION="ap-northeast-1"
aws ecr get-login-password \
  --region $AWS_TOKYO_REGION \
  | docker login \
  --username "AWS" \
  --password-stdin 671093793941.dkr.ecr.$AWS_TOKYO_REGION.amazonaws.com

echo "👀 Building the image ..."
tag_name="ajktown-fe:latest"
docker build -q -t $tag_name . # -q for quiet; Does not print anything to STDOUT
docker tag $tag_name 671093793941.dkr.ecr.$AWS_TOKYO_REGION.amazonaws.com/ajktown/wordnote:latest

echo "👀 Pushing the image to AWS ECR ..."
docker push 671093793941.dkr.ecr.$AWS_TOKYO_REGION.amazonaws.com/ajktown/wordnote:latest

echo "🧹 Cleaning up ..."
cleanup
