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
              <h2 id="title-${blog._id}">${blog.title}</h2>
              <p id="body-${blog._id}">${blog.body}</p>
              <small>By ${blog.author || "Anonymous"}</small>
              <button onclick="editBlog('${blog._id}')">Edit</button>
              <button onclick="deleteBlog('${blog._id}')">Delete</button>
              <button id="save-${blog._id}" style="display: none;" onclick="saveBlog('${blog._id}')">Save</button>
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

    window.editBlog = (id) => {
        const titleElement = document.getElementById(`title-${id}`);
        const bodyElement = document.getElementById(`body-${id}`);
        const saveButton = document.getElementById(`save-${id}`);

        titleElement.innerHTML = `<input type="text" value="${titleElement.innerText}">`;
        bodyElement.innerHTML = `<textarea>${bodyElement.innerText}</textarea>`;

     
        saveButton.style.display = "inline-block";
        saveButton.previousElementSibling.style.display = "none";  
    };

    window.saveBlog = async (id) => {
        const titleElement = document.getElementById(`title-${id}`);
        const bodyElement = document.getElementById(`body-${id}`);

        const updatedTitle = titleElement.querySelector("input").value;
        const updatedBody = bodyElement.querySelector("textarea").value;

        await fetch(`/blogs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: updatedTitle,
                body: updatedBody
            })
        });

        fetchBlogs();
    };

    fetchBlogs();
});
