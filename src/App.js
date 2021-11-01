import React, { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const url = `${process.env.REACT_APP_API_URL}/activities`;

    try {
      const response = await fetch(url);
      const obj = await response.json();
      const results = obj.data;
      setActivities(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const onInputChange = (e) => {
    setInputText(e.target.value);
  };

  const onActivitySubmit = async () => {
    const url = `${process.env.REACT_APP_API_URL}/activities`;
    const conf = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    };

    try {
      const response = await fetch(url, conf);
      const obj = await response.json();

      if (obj.status === "success") {
        await fetchActivities();
        setInputText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onActivityDelete = async (id) => {
    const url = `${process.env.REACT_APP_API_URL}/activities/${id}`;
    const conf = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, conf);
      const obj = await response.json();

      if (obj.status === "success") {
        await fetchActivities();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="container space-y-4 mx-auto max-w-md mt-12">
        <h1 className="text-3xl font-black">To do list</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">New activity</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Activity"
              onChange={onInputChange}
              value={inputText}
              className="w-full pr-16 input input-primary input-bordered"
            />
            <button
              className="absolute top-0 right-0 rounded-l-none btn btn-primary"
              onClick={onActivitySubmit}
            >
              add
            </button>
          </div>
        </div>
        {activities &&
          activities.map(({ _id, text }) => (
            <div key={_id} className="card shadow-lg">
              <div className="card-body flex justify-between flex-row">
                <p>{text}</p>
                <button
                  className="btn btn-xs"
                  onClick={() => onActivityDelete(_id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
