#!/usr/bin/node

//TODO:
// detect type of response; stop, length, ect.
// check for flags (set ai model, set temp, ect.)

const { exec } = require('node:child_process');
const fs = require('fs');

let rawArguments = process.argv;
// remove node and file references
rawArguments.shift();
rawArguments.shift();
// join arguments to create string command
const arguments = rawArguments.join(' ');

let model = "gpt-3.5-turbo";
let temperature = 0.7;
let key = getKeyFromEnv();

function getKeyFromEnv()
{
  const key = process.env.OPENAI_KEY;
  if(key)
  {
    return key;
  }
  else
  {
    console.error("Error: API key environment variable not set.");
  }
}

let query = arguments;

let command = `curl https://api.openai.com/v1/chat/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${key}" \
-d '{
   "model": "${model}",
   "messages": [{"role": "user", "content": "${query}"}],
   "temperature": ${temperature}
 }'`;

if(query)
{
  console.log("> ", query);

  exec(command, (err, output) => {
    if(err)
    {
      console.error("could not execute command: ", err);
      return;
    }
    console.log(getContent(output));
    //console.log(checkData(output));
  });
}

function getContent(input)
{
  let jsonResult = JSON.parse(input);
  let result = jsonResult.choices[0].message.content;
  return result;
}

// ----------------------------------------------------------

function checkData(data)
{
  let prefix = "";
  switch(data.choices[0].finish_reason)
  {
    case "stop":
      return data.choices[0].message.content;
    case "length":
      prefix = "Content restricted due to exceeding tokens: /n";
      return returnResult(data, prefix);
    case "function_call":
      prefix = "function call: /n";
      return returnResult(data, prefix);
    case "content_filter":
      prefix = "content restricted due to content filter: /n";
      return returnResult(data, prefix);
    case "null":
      prefix = "null: /n";
      return returnResult(data, prefix);
    default:
      return returnResult(data, prefix);
  }
}

function returnResult(data, prefix="")
{
  let message = "";
  const content = data?.choices[0]?.message?.content;
  if(content) 
  {
    message = content;
  }
  const result = prefix + message;
  return result;
}

