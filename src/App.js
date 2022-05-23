
import './App.css';

import React from "react";
import { Configuration, OpenAIApi } from "openai";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [id, setId] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [data, setData] = React.useState("");


  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (data) {
      const newData = {
        id: id,
        prompt: prompt,
        data: data
      }
      const updatedData = [...items, newData];
      setItems(updatedData);
    }
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();

    const configuration = new Configuration({
      apiKey: "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",
    });
    const openApi = new OpenAIApi(configuration);

    openApi
      .createCompletion("text-curie-001", {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      })
      .then((res) => {
        setId(uuidv4());
        setPrompt(prompt);
        console.log(res.data.choices[0].text.trim())
        setData(res.data.choices[0].text.trim());
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <section className="App">
      <div className="container">
        <title>Shopify Challenge</title>
        <main>
          <h1>Fun with AI</h1>
          <p >Shopify Challenge</p>

          <form onSubmit={onSubmit}>
            <label>Enter prompt:</label>
            <textarea
              type="text"
              name="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
            <button
              className="btn"
              type="submit">
              Submit
            </button>
          </form>

          <ul>
         {items.map(({ id, prompt, data }) => (
              <li key={id} className="wrapper-response">
                <h4>Prompt: {prompt}</h4>
                <h4>Response: {data}</h4>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </section>
  );
};

export default App;