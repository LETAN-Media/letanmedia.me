#!/bin/bash
# Script gọi Gemini API tự động từ biến môi trường

API_KEY="${GEMINI_API_KEY:-AIzaSyBM3GrQUWe3hElV4rKLe6qekshmzXXJfiQ}"
MODEL="${GEMINI_MODEL:-gemini-2.5-flash}"
ENDPOINT="${GEMINI_ENDPOINT:-https://generativelanguage.googleapis.com/v1beta/models}"
PROMPT="${1:-1+1 bằng mấy?}"

# Escape prompt để an toàn trong JSON
ESCAPED_PROMPT=$(echo "$PROMPT" | sed 's/"/\\"/g')

curl -s -X POST "${ENDPOINT}/${MODEL}:generateContent?key=${API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"contents\":[{\"parts\":[{\"text\":\"${ESCAPED_PROMPT}\"}]}]}"
