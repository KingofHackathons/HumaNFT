"use client";

// Code taken and modified from https://github.com/david-j-wu/gpt-chatbot/

import { useState, useEffect, useRef } from "react";

// Used to parse message contents as markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { NFTStorage, File, Blob } from 'nft.storage';

function createInitialPrompt() {
  const projectAnswers = JSON.parse(localStorage.getItem('projectAnswers') || "{}");
  const indivAnswers = JSON.parse(localStorage.getItem('individualAnswers') || "{}");

  console.log("The stored details are", projectAnswers, indivAnswers);

  const finalPrompt = `
      The conversation below will take place in a world where the following has happened: ${projectAnswers.pquestion1}
      Specifically, this conversation is taking place within the following scenario: ${projectAnswers.pquestion2}
      
      When you respond to this question, imagine you are a ${indivAnswers.iquestion1}
      This person's backstory is ${indivAnswers.iquestion2}
      This person has certain goals and is driven by ${indivAnswers.iquestion3}
      The people that matter the most to them are ${indivAnswers.iquestion4}
      In stressful situations, they ${indivAnswers.iquestion5}
      When they meet others they feel ${indivAnswers.iquestion6}
      Their biggest flaws are ${indivAnswers.iquestion7}
  `;

  localStorage.setItem("currentSystemPrompt", finalPrompt);
  return [{role: "system", content: finalPrompt}];
}

async function getImage() {
  const imageOriginUrl = localStorage.getItem("selectedNFTImage") || "";
  const r = await fetch(imageOriginUrl);
  if (!r.ok) {
    throw new Error(`error fetching image: ${r.status}`)
  }
  return r.blob()
}

async function storeImageonIPFS() {
  const image = await getImage();
  const prompt = localStorage.getItem("currentSystemPrompt") || "";

  const nft = {
    image, // use image Blob as `image` field
    name: "Storing the first AI NFT with its prompt for GPT-3.5",
    description: prompt
  };

  const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN || "" });
  const metadata = await client.store(nft)

  console.log('NFT data stored!')
  console.log('Metadata URI: ', metadata.url);
  return metadata.embed().image.href;
}

export default function Home() {
  // State variables
  const [messages, setMessages] = useState(() => createInitialPrompt()); // An array of the messages that make up the chat
  const [newMessageText, setNewMessageText] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [nftLink, setNftLink] = useState("");
  const nftImgLink = localStorage.getItem("selectedNFTImage") || "";
  const nftName = localStorage.getItem("selectedNFTText") || "";

  // `onChange` event handler to update `newMessageText` as the user types
  const onChange = (event) => {
    setNewMessageText(event.target.value);
  };

  // `onClick` event handler to create a new chat
  const onClick = () => {
    setMessages(() => createInitialPrompt());
    setNewMessageText("");
  };

  // `onSubmit` event handler fired when the user submits a new message
  const onSubmit = async (event) => {
    event.preventDefault();
    setMessages([...messages, { role: "user", content: newMessageText }]);
    setLoadingStatus(true);
    setNewMessageText("");
  };

  // `onKeyDown` event handler to send a message when the return key is hit
  // The user can start a new line by pressing shift-enter
  const onKeyDown = (event) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      onSubmit(event);
    }
  };

  // Effect hook triggered when `loadingStatus` changes
  // Triggered on form submission
  useEffect(() => {
    // Function that calls the `/api/chat` endpoint and updates `messages`
    const fetchReply = async () => {
      try {
        // Try to fetch a `reply` from the endpoint and update `messages`
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages }),
        });

        const responseBody = await response.json();
        const reply =
          response.status === 200
            ? responseBody.reply
            : responseBody.error.reply;

        setMessages([...messages, reply]);
      } catch {
        // Catch and handle any unexpected errors
        const reply = {
          role: "assistant",
          content: "An error has occured.",
        };

        setMessages([...messages, reply]);
      }
      // Set `setLoadingStatus` to false
      setLoadingStatus(false);
    };

    // `fetchReply` executes only if a new message has been submitted
    // `setLoadingStatus(false)` triggers the hook again
    // No action occurs the second time because of the condition
    if (loadingStatus === true) {
      fetchReply();
    }
  }, [loadingStatus]);

  // Logic for auto-adjusting the textarea height as the user types
  // Ref variables
  const textareaRef = useRef(null);
  const backgroundRef = useRef(null);
  const whitespaceRef = useRef(null);

  // Effect hook triggered when `newMessageText` changes
  useEffect(() => {
    // Set the textarea height to 0 px for an instant
    // Triggers scroll height to be recalculated
    // Otherwise, the textarea won't shrink
    textareaRef.current.style.height = "0px";

    const MAX_HEIGHT = 320;
    const HEIGHT_BUFFER = 4;
    const VERTICAL_SPACING = 20;

    const textareaContentHeight =
      textareaRef.current.scrollHeight + HEIGHT_BUFFER;

    const textareaHeight = Math.min(textareaContentHeight, MAX_HEIGHT);

    textareaRef.current.style.height = textareaHeight + "px";
    backgroundRef.current.style.height =
      textareaHeight + 2 * VERTICAL_SPACING + "px";
    whitespaceRef.current.style.height =
      textareaHeight + 2 * VERTICAL_SPACING + "px";
  }, [newMessageText]);

  return (
    <main className="mx-auto max-w-full sm:max-w-3xl">

      {messages.length===1 && (
        <div className="mx-10 mt-20 flex flex-col items-center">
          <div>
            <h1 className="text-white mb-1 text-2xl">Let's checkout {nftName}'s new persona</h1>
          </div>
          <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 border-none rounded-lg w-1/2 h-1/4'>
              <div className='border-none rounded-lg overflow-hidden w-1/2 h-1/4'></div>
              <img className="object-scale-down" src={nftImgLink}/>
          </div>
        </div>
      )}

      <div id="overallDiv" className="flex flex-col">
        <div>
          {messages.slice(1).map((message, index) => (
            <div className={message.role==="assistant" ? 
                  "rounded-md shadow-lg p-4 mx-2 my-4 float-left clear-both bg-white" : "rounded-md shadow-lg p-4 mx-2 my-4 float-right clear-both bg-white"} key={index.toString()}>
              <p className="font-bold">
                {message.role === "assistant" ? "The Storyteller" : "You"}
              </p>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          ))}
        </div>

        {loadingStatus && (
          <div className="mx-2 mt-4 float-left clear-both">
            <p className="font-bold text-white">Waiting for reply...</p>
          </div>
        )}

        {!loadingStatus && messages.length > 1 && (
          <div className="mt-4 flex justify-center">
            <Button className='text-lg py-0 text-white mr-2' onClick={onClick} variant="outline">New Chat</Button>
            <Button className='text-lg py-0 text-white' variant="outline" onClick={async ()=>{
              const storageURL = await storeImageonIPFS();
              setNftLink(storageURL);
            }}>Mint your Persona</Button>
          </div>
        )}

        {nftLink!=="" && <p className="text-l text-white">The URL of the image is <a href={nftLink}>{nftLink}</a></p>}
      </div>

      <div ref={whitespaceRef} className="z-0"></div>
      <div
        ref={backgroundRef}
        className="fixed bottom-0 z-10 w-full max-w-full
                     sm:max-w-3xl"
      ></div>

      <div
        className="fixed bottom-5 z-20 w-full max-w-full 
                     sm:max-w-3xl"
      >
        <form className="mx-2 flex items-end" onSubmit={onSubmit}>
          <textarea
            ref={textareaRef}
            className="mr-2 grow resize-none rounded-md border-2 
                       border-gray-400 p-2 focus:border-blue-600 
                         focus:outline-none"
            value={newMessageText}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Start chatting"
          />

          {loadingStatus ? (
            <Button className='text-lg py-0 text-white' variant="outline"  type="submit" disabled>Send</Button>
          ) : (
            <Button className='text-lg py-0 text-white' variant="outline" type="submit">Send</Button>
          )}
        </form>
      </div>
    </main>
  );
}