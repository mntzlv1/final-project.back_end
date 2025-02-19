document.addEventListener("DOMContentLoaded", () => {
    const blogForm = document.getElementById("blogForm");
    const blogsContainer = document.getElementById("blogs");

    const fetchBlogs = async () => {
        const res = await fetch("/blogs");
        const blogs = await res.json();
        blogsContainer.innerHTML = "";
        blogs.forEach(blog => {
            const div = document.createElement("div");
            div.className = "blog";
            div.innerHTML = `
                <h2>${blog.title}</h2>
                <p>${blog.body}</p>
                <small>By ${blog.author || "Anonymous"}</small>
                <button onclick="deleteBlog('${blog._id}')">Delete</button>
            `;
            blogsContainer.appendChild(div);
        });
    };

    blogForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const body = document.getElementById("body").value;
        const author = document.getElementById("author").value;
        await fetch("/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body, author })
        });
        blogForm.reset();
        fetchBlogs();
    });

    window.deleteBlog = async (id) => {
        await fetch(`/blogs/${id}`, { method: "DELETE" });
        fetchBlogs();
    };

    fetchBlogs();
});
