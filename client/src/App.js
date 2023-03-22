import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Delete from "./compoment/icons/Delete";
import Copy from "./compoment/icons/Copy";
import Editor from "@monaco-editor/react"
import Loading from "./compoment/icons/Loading"

const App = () => {

  const copyToClipBoard = () => alert(`Copied ✅`);
  /* A React Hook. It is a function that lets you “hook into” React state and lifecycle features from
  function components. */
  const [value, setValue ] =useState("");
  /* A React Hook. It is a function that lets you “hook into” React state and lifecycle features from
  function components. */
  const [output, setOutput ] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * It takes the value from the input field, sends it to the server, and then sets the output to the
   * response from the server
   */
  const handleSubmit = () => {
    //👇🏻 sets to true
    setLoading(true);
    fetch("http://localhost:4000/convert", {
      method: "POST",
      body: JSON.stringify({
        value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
          setOutput(data.response);
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className='app'>
      {/* The header of the app. */}
      <header className='header__container'>
        <div className='header'>
          <h3>JSON</h3>
          <div className='header__right'>
            <button className='runBtn' onClick={handleSubmit}>
              RUN
            </button>
            <Delete setValue={setValue} />
          </div>
        </div>

        <div className='header'>
          <h3>Typescript</h3>
          <CopyToClipboard text={output} onCopy={copyToClipBoard}>
            <span>
              <Copy />
            </span>
          </CopyToClipboard>
        </div>
      </header>

      <div className='code__container'>
        {/* A div that contains a monaco editor. */}
        <div className='code'>
          <Editor
            height='90vh'
            className='editor'
            defaultLanguage='json'
            defaultValue='{ }'
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
        {/*  A div that contains a monaco editor */}
        <div className='output'>
          {loading ? (
            <Loading />
          ): (
              <Editor
                height='90vh'
                className='editor'
                defaultLanguage='typescript'
                options={{
                  domReadOnly: true,
                  readOnly: true,
                }}
                defaultValue=''
                value={output}
                onChange={(value) => setOutput(value)}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default App;