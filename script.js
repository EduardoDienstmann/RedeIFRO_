let currentUser = null;
const posts = [];
const messages = [];

function login() {
  const username = document.getElementById('usernameInput').value.trim();
  if (username.length < 3) return alert("Nome muito curto");
  currentUser = username;
  document.getElementById('profileName').innerText = username;
  document.getElementById('loginContainer').style.display = "none";
  document.getElementById('mainApp').style.display = "block";
  renderPosts();
  renderMessages();
}

function logout() {
  currentUser = null;
  document.getElementById('loginContainer').style.display = "block";
  document.getElementById('mainApp').style.display = "none";
}

function createPost() {
  const text = document.getElementById('postText').value.trim();
  const fileInput = document.getElementById('imageUpload');
  const imageFile = fileInput.files[0];

  if (!text && !imageFile) return alert("Digite algo ou envie uma imagem.");

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      posts.unshift({ user: currentUser, content: text, image: e.target.result, time: new Date() });
      document.getElementById('postText').value = "";
      fileInput.value = "";
      renderPosts();
    };
    reader.readAsDataURL(imageFile);
  } else {
    posts.unshift({ user: currentUser, content: text, image: null, time: new Date() });
    document.getElementById('postText').value = "";
    renderPosts();
  }
}

function renderPosts() {
  const container = document.getElementById('postsContainer');
  container.innerHTML = "";
  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = \`
      <strong>\${post.user}</strong> <small>\${post.time.toLocaleString()}</small>
      <p>\${post.content}</p>
      \${post.image ? \`<img src="\${post.image}">\` : ""}
    \`;
    container.appendChild(div);
  });
}

function sendMessage() {
  const to = document.getElementById('msgDestinatario').value.trim();
  const msg = document.getElementById('msgTexto').value.trim();
  if (!to || !msg) return alert("Preencha os campos.");
  messages.push({ from: currentUser, to, msg, time: new Date() });
  document.getElementById('msgTexto').value = "";
  renderMessages();
}

function renderMessages() {
  const box = document.getElementById('messageContainer');
  box.innerHTML = "";
  const userMsgs = messages.filter(m => m.to === currentUser || m.from === currentUser);
  userMsgs.reverse().forEach(m => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = \`
      <strong>\${m.from} ➤ \${m.to}</strong> <small>\${m.time.toLocaleString()}</small>
      <p>\${m.msg}</p>
    \`;
    box.appendChild(div);
  });
}

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});