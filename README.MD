
Simple CLI ChatGPT interface
Written for linux. May adapt to work on windows in the future.
<br>

Usage:
set environment variable OPENAI_KEY to your openai key
You can do this by adding:
export OPENAI_KEY="youy key"
to your .bashrc file
<br>

You can call the script from within it's directory with:
$node ai.js the text of your query
<br>

For simpler use:
set script file permission to be executable
$chmod +x ai.js
$chmod u+rwx,g+rwx,o+rwx ai.js
<br>

Rename ai.js to just ai or preferred command name
Place or add into your PATH.
log out and back in
<br>

$ai What is the capital of Nebraska?
<br>

TODO:<br>
-detect type of responces<br>
-support flags (set ai model, set temp, ect)<br>
-support chat sessions<br>