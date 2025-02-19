**Technical Lesson: Refactoring API Calls with Custom Hooks and npm Package Management**
========================================================================================

**Introduction**
----------------

In React applications, fetching data from an API is a common task. However, when multiple components need to fetch different data, they often **duplicate the same logic**, leading to code that is:

-   **Difficult to maintain** ❌ -- Updates need to be made in multiple places.
-   **Repetitive** ❌ -- Similar `useEffect` logic is used across components.
-   **Error-prone** ❌ -- Debugging network requests becomes harder.

### ✅ **Solution:**

To **fix** this, we will:

1.  **Refactor API calls into a Custom Hook** (`useFetchData.js`) to centralize logic.
2.  **Use npm to manage dependencies** and install third-party packages.
3.  **Introduce Chalk for better logging** -- Adding **color-coded debugging messages** to track API calls in the browser console.

* * * * *

**Task 1: Setup the project and Manage Dependencies with npm**
----------------------------------------------------
**Project Setup: Installing Dependencies**
------------------------------------------

### **Step 1: Ensure You Have Node.js and npm Installed**

Before starting, confirm you have **Node.js** and **npm** installed.\
Run the following command to check:

```bash
node -v
npm -v
```
### **Step 2: Create a React Project Using Vite**

You can use this [repo](https://github.com/learn-co-curriculum/custom-hooks-technical-lesson) , create one using **Vite**:
```bash
# Create a new Vite project
npm create vite@latest my-app --template react

# Navigate into the project folder
cd my-app

# Install necessary dependencies
npm install

# Start the development server
npm run dev
```
This will:\
✅ Set up a **React development environment** using Vite.\
✅ Install **default dependencies** (React, ReactDOM).\
✅ Start a local server at `http://localhost:5173/`.

### **Step 3: Install Additional Dependencies**

To enhance debugging and manage package dependencies, install the following:
```bash
npm install react-router-dom chalk

```

### **Why use Chalk?**

-   ✅ **Enhances debugging** -- Color-coded logs help identify success, errors, and warnings.
-   ✅ **Improves readability** -- Makes console output **clearer** when fetching API data.
### **react-router-dom**
-   ✅ **`react-router-dom`** -- Enables page navigation.


**Scenario: Why Use a Custom Hook?**
------------------------------------

### **❌ BEFORE (Without a Custom Hook - Current State)**

Right now, both `Posts.jsx` and `Users.jsx` fetch data separately. Each uses `useEffect` with **duplicated API-fetching logic**.

#### **Code for `Posts.jsx` (before refactoring)**
```jsx
import React, { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading posts...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="container">
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
```
Code for `Users.jsx` (before refactoring)
```jsx
import React, { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading users...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="container">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
```

**Task 2: Create the Custom Hook (`useFetchData.js`)**
------------------------------------------------------

### **Step 1: Add a New File for the Hook**

Create a new file inside `src/hooks/` called **`useFetchData.js`**.

📁 **File: `src/hooks/useFetchData.js`**
```jsx
import { useState, useEffect } from "react";
import chalk from "chalk";

/**
 * Custom Hook for fetching API data.
 * @param {string} url - The API endpoint.
 * @param {Object} options - Optional fetch settings.
 * @returns {Object} { data, loading, error, refetch }
 */
function useFetchData(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch function that can be triggered manually
  const fetchData = async () => {
    setLoading(true);
    console.log(chalk.blue(`Fetching data from: ${url}`));

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      console.log(chalk.green("Data fetched successfully!"), result);
      setData(result);
    } catch (err) {
      console.log(chalk.red("Error fetching data:"), err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetchData;
```
✅ **Improvements:**

-   **Encapsulates API logic** -- No need to write `useEffect` in every component.
-   **Reusability** -- Works in any component needing API data.
-   **Refetch function** -- Allows manual data fetching with a button click.
-   **Uses Chalk** -- Adds **color-coded console logs** for easier debugging.



**Task 3: Use the Custom Hook in Components**
---------------------------------------------

### **Step 2: Refactor `Posts.jsx`**

📁 **File: `src/components/Posts.jsx`**
```jsx
import React from "react";
import useFetchData from "../hooks/useFetchData";

function Posts() {
  const { data, loading, error, refetch } = useFetchData(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <p className="loading">Loading posts...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="container">
      <h2>Posts</h2>
      <button onClick={refetch}>Refresh Posts</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
```

✅ **Refactored Features:**

-   Uses **`useFetchData`** instead of duplicating logic.
-   Includes a **"Refresh" button** to manually re-fetch posts.
-   Chalk logs API requests and errors.

#### **Step 3: Refactor `Users.jsx`**
--------------------------------

Now, let's replace the old `useEffect` logic in **`Users.jsx`** with our **Custom Hook (`useFetchData`)**.

📁 **File: `src/components/Users.jsx`**

```jsx
import React from "react";
import useFetchData from "../hooks/useFetchData";

function Users() {
  const { data, loading, error, refetch } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <p className="loading">Loading users...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="container">
      <h2>Users</h2>
      <button onClick={refetch}>Refresh Users</button>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
```
✅ **Refactored Features in `Users.jsx`:**

-   Uses **`useFetchData`** to remove redundant `useEffect` logic.
-   Includes a **"Refresh Users" button** to manually re-fetch users.
-   Improved readability and maintainability.


### **Task 4: Manage Dependencies and Security**

#### **Step 4: Viewing Installed Dependencies**

To list all installed packages:

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

**Task 5: Document, Refactor, and Maintain**
--------------------------------------------

### **Step 5: Using Git Best Practices**

To track changes efficiently, follow this Git workflow:

1.  **Create a new feature branch:**
```bash
git checkout -b feature-custom-hook
```
2. **Stage and commit changes:**
```bash
git add .
git commit -m "Added useFetchData custom hook and npm dependency management"
```
3. **Push the branch to GitHub:**
```bash
git push origin feature-custom-hook
```
4. ** Create a pull request (PR) on GitHub and merge into `main`
5. ** After merging, delete the feature branch locally:**
```bash
git branch -d feature-custom-hook
```

**Final Considerations**
------------------------

### ✅ **Why Use Custom Hooks?**

-   **Modular Code:** Extracts logic into reusable functions.
-   **Easier Maintenance:** Updates apply to all components using the hook.
-   **Less Repetition:** No need to write `useEffect` API calls in every component.

### ✅ **Why Use npm for Package Management?**

-   **Dependency Tracking:** Manages third-party libraries efficiently.
-   **Security Updates:** Detects and fixes vulnerabilities.
-   **Version Control:** Ensures compatibility across different project setups.

* * * * *

**Summary**
-----------

By completing this lesson, students have: 
✅ **Created a Custom Hook** (`useFetchData`) for API fetching.\
✅ **Used the Custom Hook** in multiple components (`Posts.jsx`, `Users.jsx`).\
✅ **Removed duplicate `useEffect` logic**, making the code more modular.\
✅ **Installed and used Chalk** to log API requests.\
✅ **Followed npm best practices** for package management.

🚀 **Next Steps:** 🔹 Extend `useFetchData` to support **POST requests**.\
🔹 Optimize with **useCallback** to prevent unnecessary re-fetching.\
🔹 Introduce **pagination** to manage large datasets efficiently.