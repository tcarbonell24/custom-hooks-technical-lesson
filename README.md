### **Page: Technical Lesson: Custom Hooks and Package Management with npm**

This lesson will guide students through creating and using a **Custom Hook in React** while managing dependencies using **npm**. Students will install necessary dependencies, create a reusable function for API calls, and implement it in a React component. By following along, students will learn best practices for optimizing code and maintaining packages in a project.

---

### **Introduction**
In React applications, developers frequently fetch data from APIs. Without **Custom Hooks**, this leads to **duplicated code** and poor maintainability. To solve this, developers encapsulate logic into a reusable **Custom Hook**, making the code more modular and easier to manage.

Additionally, modern development relies on **npm** to handle external dependencies. Managing dependencies correctly ensures that projects remain stable, secure, and optimized. This lesson combines these concepts to help students:
- **Create and use a Custom Hook (`useFetchData`)** to handle API calls.
- **Install and manage dependencies** in a React project using npm.
- **Check for security vulnerabilities** and update outdated packages.
- **Use Chalk to improve debugging and logging.**

---

### **Tools and Resources**
- **Code Editor:** VS Code or any preferred IDE  
- **React Development Environment:** Vite (`npm create vite@latest my-app --template react`)  
- **npm Package Manager:** Installed with Node.js ([Download Node.js](https://nodejs.org/))  
- **API for Testing:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/)  
- **npm Documentation:** [npm Docs](https://docs.npmjs.com/)  
- **React Hooks Documentation:** [React Hooks](https://react.dev/reference/react)  
- **Chalk Documentation:** [Chalk Docs](https://www.npmjs.com/package/chalk)  

---

### **Instructions**  

#### **Step 1: Initialize a React Project and Manage Dependencies with npm**  
If you don’t have a React project set up, create a new React app using **Vite**:  

```sh
npm create vite@latest my-app --template react
cd my-app
npm install
npm run dev
```

This creates a new React project and starts the development server.  

#### **Installing Dependencies**  
To install the required dependencies, run:  

```sh
npm install react-router-dom chalk
```

This installs `react-router-dom` for navigation and `chalk` for adding color-coded logs to the console. The installation process:  
- Downloads the package from the npm registry.  
- Adds it to `package.json` under "dependencies".  
- Generates `package-lock.json` to lock versions for consistency.  

---

#### **Step 2: Create a Custom Hook (`useFetchData.js`)**  
Inside the `src` folder, create a new file named `useFetchData.js`.  

Write the following code inside the file:  

```jsx
import { useState, useEffect } from "react";
import chalk from "chalk";

/**
 * useFetchData is a custom hook that simplifies data fetching in React components.
 * It takes a URL as an argument and returns the fetched data, a loading state, and any errors encountered.
 */
function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(chalk.blue("Fetching data from:"), chalk.green(url));
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(chalk.green("Data fetched successfully:"), result);
        setData(result);
      } catch (err) {
        console.log(chalk.red("Error fetching data:"), err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetchData;
```

This **encapsulates API fetching logic** into a reusable function, improving maintainability. The **Chalk package** adds color-coded logs to the console to enhance debugging and error tracking.  

---

#### **Step 3: Use the Custom Hook in a Component (`App.jsx`)**  
Modify `src/App.jsx` to use the Custom Hook:  

```jsx
import React from "react";
import useFetchData from "./useFetchData";

function App() {
  const { data, loading, error } = useFetchData(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Fetched Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

This implementation:  
- **Calls `useFetchData`** inside the functional component to retrieve API data.  
- **Displays a loading message** while data is being fetched.  
- **Handles errors gracefully** by displaying an error message.  
- **Maps the fetched data** into a list of posts.  

---

#### **Step 4: Managing Dependencies and Security with npm**  

**Viewing Installed Dependencies**  
To check all installed packages in the project, run:  

```sh
npm list --depth=0
```

**Updating Dependencies**  
To update all installed packages to the latest minor/patch versions, run:  

```sh
npm update
```

**Checking for Security Vulnerabilities**  
To scan the project for security vulnerabilities in dependencies, run:  

```sh
npm audit
```

If critical vulnerabilities require major version updates, use:  

```sh
npm audit fix --force
```

---

### **Summary of Custom Hooks and Package Management with npm**  
By completing this lesson, students have learned how to:  
- **Create a reusable Custom Hook (`useFetchData`)** to encapsulate API-fetching logic in React.  
- **Use npm** to install, manage, and update dependencies in a project.  
- **Use Chalk to enhance debugging and error tracking.**  
- **Check for security vulnerabilities** and keep packages up to date using `npm audit`.  

By integrating **Custom Hooks with npm package management**, developers can write **efficient, modular, and maintainable** React applications while keeping dependencies secure and up to date. 🚀

