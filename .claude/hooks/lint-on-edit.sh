#!/bin/bash
# PostToolUse hook: auto-lint files just touched by Edit/Write with oxlint.
# Never blocks the tool call — lint output is surfaced to Claude as feedback.

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

[ -z "$file_path" ] && exit 0
[[ "$file_path" != *.ts && "$file_path" != *.tsx ]] && exit 0
[ ! -f "$file_path" ] && exit 0

project_root="${CLAUDE_PROJECT_DIR:-/Users/murtazabanduk/archy site}"
oxlint_bin="$project_root/node_modules/.bin/oxlint"

[ ! -x "$oxlint_bin" ] && exit 0

output=$("$oxlint_bin" "$file_path" 2>&1)
if [ $? -ne 0 ]; then
  echo "oxlint found issues in $file_path:" >&2
  echo "$output" >&2
  exit 2
fi

exit 0
