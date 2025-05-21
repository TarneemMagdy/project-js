



let cardMain = document.querySelector("#card-main");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let usernameRegister = document.querySelector("#usernameRegister");
let passwordRegister = document.querySelector("#passwordRegister");
let nameRegister = document.querySelector("#nameRegister");
let baseUrl = "https://tarmeezacademy.com/api/v1";
let btnLogin = document.querySelector("#btn-login");
let btnLoginAndRegisterNav = document.querySelector("#btn-login-register");
let btnLogout = document.querySelector("#btn-logout");
let btnRegister = document.querySelector("#btn-register");
let btnPost = document.querySelector("#add-post-btn");
let postTitle = document.querySelector("#post-title-input");
let postBody = document.querySelector("#post-body-input");
let commentInput = document.querySelector("#comment-input");
let creatPostBtn = document.getElementById("btn-post-submit");
let postImage = document.querySelector("#post-image-input");
let registerImage = document.querySelector("#image-register");
let postIdToDelete = null;
let inputMainComment = document.querySelector("#input-main-comment");

let cardPostDetails = document.querySelector(".post-card");

let isRequesting = false;
let commentsArray = []; // المصفوفة التي تحتوي على التعل

const params = new URLSearchParams(window.location.search);
const postId = params.get("postId");

if (postId) {
  getPost(postId);

  // createComment(postId)
}

const modalLogin = document.getElementById("modalLogin");
const modalRegister = document.getElementById("modalRegister");
const modalPost = document.querySelector("#modalPost");

let currentPage = 1;
let lastPage = 1;
//////////UI Nav///////////////////
setupUI();

////////////////////pagination (infite scroll)/////////////////////

window.addEventListener("scroll", function () {
  let endOfPage =
    window.innerHeight + window.scrollY >= document.body.scrollHeight;

  if (endOfPage && currentPage < lastPage) {
    currentPage += 1;
    getPosts(false, currentPage); // بدون حذف البوستات السابقة
  }
});

////////////////get posts//////////////////
// function getPosts(reload = true, currentPage = 1) {
//   // if (isRequesting) return;
//   // isRequesting = true;
//   // if (cardMain !== null) {
//   //   cardMain.innerHTML = "";
//   // }

//   // if (reload) {
//   //   cardMain ? (cardMain.innerHTML = "") : null;
//   // }

//   if (isRequesting) return;
//   isRequesting = true;

//   if (reload && cardMain !== null) {
//     cardMain.innerHTML = "";
//   }

//   showSpinner();
//   axios
//     .get(`${baseUrl}/posts?limit=50&page=${currentPage}`)
//     .then(function (response) {
//       console.log(response.data.data);
//       lastPage = response.data.meta.last_page;

//       let data = response.data.data;
//       console.log(data);

//       let content = "";
//       for (var post of data) {
//         console.log("kkkk", post);

//         let tagsHTML = "";
//         for (let tag of post.tags) {
//           tagsHTML += `<button class="btn btn-sm rounded-5 mx-1" style="background-color:gray;" id="post-tags-${post.id}">${tag.name}</button>`;
//         }
//         let user = getCurrentUser();
//         let isMyPost = user !== null && post.author.id == user.id;
//         let editBtnContent = ``;

//         if (isMyPost) {
//           editBtnContent = `<button class="btn btn-secondary"
//     onclick="editPostBtnClicked(JSON.parse(decodeURIComponent('${encodeURIComponent(
//       JSON.stringify(post)
//     )}')))">
//     edit
//   </button>
//     <button class="btn btn-danger" onclick="deletePost(${post.id})">
//           delete
//         </button>
  
//   `;
//         }
//         content += `
//         <div class="card post-card my-5" style="   cursor: pointer;">
//          <div class="card-body d-flex align-items-center" >
//         <div  class='d-flex align-items-center' onclick='userClicked(${post.author.id})' style='  cursor: pointer;'>
//     <img src="${post.author.profile_image}" alt="User Avatar" class="avatar me-2">
//       <h6 class="mb-0">${post.author.name}</h6>
// </div>
//       <div class='ms-auto'>
//         ${editBtnContent}
      
//       </div>
    



//     </div>
//     <div onclick="postClicked(${post.id})">
//      <a ><img src="${post.image}" class="card-img-top" alt="Post Image"></a>
//     <div class="card-body">
//       <small class="text-muted">${post.created_at}</small>
//       <h5 class="card-title mt-2">${post.title}</h5>
//       <p class="card-text">${post.body}</p>
//     </div>
//     <div class="card-body post-footer">
//       <small class="text-muted mx-1"><i class="fas fa-pencil-alt mx-1"></i> (${post.comments_count}) Comments  </small>
//     <span class="mx-3">${tagsHTML}</span>

//  </div>
   
//     </div>
//     </div>
//        `;
//       }

//       cardMain ? cardMain.insertAdjacentHTML("afterbegin", content) : null;
//       hideSpinner()
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//     .finally(() => {
//       isRequesting = false;
//     });
// }


// function getPosts(reload = true, currentPage = 1) {
//   if (isRequesting) return;
//   isRequesting = true;

//   if (reload && cardMain !== null) {
//     cardMain.innerHTML = "";
   
//   } 
//   toggleLodaer(true);

//   axios
//     .get(`${baseUrl}/posts?limit=50&page=${currentPage}`)
//     .then(function (response) {
//       lastPage = response.data.meta.last_page;
//       let data = response.data.data;

//       let content = "";
//       for (var post of data) {
//         // بناء كود البوست
//         let tagsHTML = "";
//         for (let tag of post.tags) {
//           tagsHTML += `<button class="btn btn-sm rounded-5 mx-1" style="background-color:gray;">${tag.name}</button>`;
//         }

//         let user = getCurrentUser();
//         let isMyPost = user !== null && post.author.id == user.id;
//         let editBtnContent = isMyPost
//           ? `<button class="btn btn-secondary" onclick="editPostBtnClicked(JSON.parse(decodeURIComponent('${encodeURIComponent(
//               JSON.stringify(post)
//             )}')))">
//   <i class="fas fa-edit"></i>
// </button>
// <button class="btn btn-danger" onclick="deletePost(${post.id})">
//   <i class="fas fa-trash-alt"></i>
// </button>`
//           : "";

//         content += `
//           <div class="card post-card my-5" style="cursor: pointer;">
//             <div class="card-body d-flex align-items-center">
//               <div onclick="userClicked(${post.author.id})" class='d-flex align-items-center' style='cursor: pointer;'>
//                 <img src="${post.author.profile_image}" alt="User Avatar" class="avatar me-2">
//                 <h6 class="mb-0">${post.author.name}</h6>
//               </div>
//               <div class='ms-auto'>${editBtnContent}</div>
//             </div>
//             <div onclick="postClicked(${post.id})">
//               <img src="${post.image}" class="card-img-top" alt="Post Image">
//               <div class="card-body">
//                 <small class="text-muted">${post.created_at}</small>
//                 <h5 class="card-title mt-2">${post.title}</h5>
//                 <p class="card-text">${post.body}</p>
//               </div>
//               <div class="card-body post-footer">
//                 <small class="text-muted mx-1"><i class="fas fa-pencil-alt mx-1"></i> (${post.comments_count}) Comments</small>
//                 <span class="mx-3">${tagsHTML}</span>
//               </div>
//             </div>
//           </div>`;
//       }

//       // Append instead of replace
//       if (cardMain) {
//         cardMain.insertAdjacentHTML("beforeend", content);
//       }

  
//     })
//     .catch(function (error) {
//       console.log(error);

//     })
//     .finally(() => {
//       isRequesting = false;
//       toggleLodaer(false);
//     });
// }






function getPosts(reload = true, currentPage = 1) {
  if (isRequesting) return;
  isRequesting = true;

  if (reload && cardMain !== null) {
    cardMain.innerHTML = ""; // فقط لو reload=true
  }

 toggleLodaer(true)

  axios
    .get(`${baseUrl}/posts?limit=50&page=${currentPage}`)
    .then(function (response) {
      lastPage = response.data.meta.last_page;
      let data = response.data.data;

      let content = "";
      for (var post of data) {
        // بناء كود البوست
        let tagsHTML = "";
        for (let tag of post.tags) {
          tagsHTML += `<button class="btn btn-sm rounded-5 mx-1" style="background-color:gray;">${tag.name}</button>`;
        }

        let user = getCurrentUser();
        let isMyPost = user !== null && post.author.id == user.id;
        let editBtnContent = isMyPost
          ? `<button class="btn btn-secondary"
              onclick="editPostBtnClicked(JSON.parse(decodeURIComponent('${encodeURIComponent(
                JSON.stringify(post)
              )}')))">edit</button>
             <button class="btn btn-danger" onclick="deletePost(${
               post.id
             })">delete</button>`
          : "";

        content += `
          <div class="card post-card my-5">
            <div class="card-body d-flex align-items-center">
              <div onclick="userClicked(${post.author.id})" class='d-flex align-items-center' style='cursor: pointer;'>
                <img src="${post.author.profile_image}" alt="User Avatar" class="avatar me-2">
                <h6 class="mb-0">${post.author.name}</h6>
              </div>
              <div class='ms-auto'>${editBtnContent}</div>
            </div>
            <div onclick="postClicked(${post.id})">
              <img src="${post.image}" class="card-img-top" alt="Post Image">
              <div class="card-body">
                <small class="text-muted">${post.created_at}</small>
                <h5 class="card-title mt-2">${post.title}</h5>
                <p class="card-text">${post.body}</p>
              </div>
              <div class="card-body post-footer">
                <small class="text-muted mx-1"><i class="fas fa-pencil-alt mx-1"></i> (${post.comments_count}) Comments</small>
                <span class="mx-3">${tagsHTML}</span>
              </div>
            </div>
          </div>`;
      }

      // Append instead of replace
      if (cardMain) {
        cardMain.insertAdjacentHTML("beforeend", content);
      }

     
    })
    .catch(function (error) {
      showAlert("error", error.response.data.message);
      // console.log(error);

    })
    .finally(() => {
      isRequesting = false;
      toggleLodaer(false);
    });
}



// ////////////Alert///////////////////
// function showSuccessfullAlert(){
//   Swal.fire({
//     toast: true,
//     position: "top-center",
//     icon: "success",
//     title: "user logged successfully.",
//     showConfirmButton: false,
//     timer: 1500,
//     timerProgressBar: true,
//   });
// }
// function showLogoutAlert() {
//   Swal.fire({
//     toast: true,
//     position: "top-center",
//     icon: "success",
//     title: "User logged out successfully.",
//     showConfirmButton: false,
//     timer: 1500,
//     timerProgressBar: true,
//   });
// }
// function showErrorAlert() {
//   Swal.fire({
//     toast: true,
//     position: "top-end",
//     icon: "error", // ← بدّل "success" بـ "error"
//     title: "Login failed. Please try again.",
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true,
//   });
// }

// in one function

function showAlert(type, message) {
  Swal.fire({
    toast: true,
    position: type === "error" ? "top-end" : "top-center",
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
}

//////////////////login/////////////
function login() {
  toggleLodaer(true);
  axios
    .post(`${baseUrl}/login`, {
      username: username.value,
      password: password.value,
    })
    .then(function (response) {
      // console.log(response);
      // console.log(response.data.token);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      showAlert("success", "User logged in successfully.");

      setupUI();
      getPosts(true, 1);
     
    })
    .catch(function (error) {
    

      showAlert("error", "Login failed. Please try again.");
      const modalInstance = bootstrap.Modal.getInstance(modalLogin);
      modalInstance.show();
     
    })
    .finally(()=>{
      toggleLodaer(false);
    })
}
btnLogin.addEventListener("click", function () {
  login();
  username.value = "";
  password.value = "";
  const modalInstance = bootstrap.Modal.getInstance(modalLogin);
  modalInstance.hide();
  setupUI();
});
btnLogout.addEventListener("click", logout);

btnRegister.addEventListener("click", function () {
  register();
  usernameRegister.value = "";
  passwordRegister.value = "";
  const modalInstance = bootstrap.Modal.getInstance(modalRegister);
  modalInstance.hide();
  setupUI();
});



// window.addEventListener("DOMContentLoaded", function () {
//   const createBtn = document.getElementById("btn-post-submit");
//   if (createBtn) {
//     createBtn.addEventListener("click", createBtnPost);
//   } else {
//     console.log("create-post-btn not found on this page.");
//   }
// });



  if (creatPostBtn) {
    creatPostBtn.addEventListener("click", function () {
      createPost();
      postTitle.value = "";
      postBody.value = "";
      postImage.value = "";

      const modalInstance = bootstrap.Modal.getInstance(modalPost);
      modalInstance.hide();

      setupUI();
     
    });
  } 

  
  



btnPost.addEventListener("click", function () {
  createBtnPost();
  
});
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setupUI();
  showAlert("success", "User logged out successfully.");
  window.location = "index.html"; 
}

function setupUI() {
  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  const avatarSpan = document.querySelector(".user-info");

  if (avatarSpan) {
    avatarSpan.remove();
  }
  if (token === null) {
    //user not login

    //  btnLoginAndRegisterNav.style.visibility = "visible";
    //  btnLogout.style.setProperty("display", "none", "important");

    btnLoginAndRegisterNav.classList.remove("hidden-btnNav");
    btnLoginAndRegisterNav.classList.add("show-btnNav");

    btnLogout.classList.remove("show-btnNav");
    btnLogout.classList.add("hidden-btnNav");
    if (inputMainComment) {
     
      inputMainComment.classList.add("hidden-btnNav");
    }


    if (btnPost !== null) {
      btnPost.classList.remove("show");
    }
  } else {
    // btnLoginAndRegisterNav.style.visibility = "hidden";
    // btnLogout.style.setProperty("display", "flex", "important");

    btnLoginAndRegisterNav.classList.remove("show-btnNav");
    btnLoginAndRegisterNav.classList.add("hidden-btnNav");

    btnLogout.classList.remove("hidden-btnNav");
    btnLogout.classList.add("show-btnNav");

    btnLogout.insertAdjacentHTML(
      "beforebegin",
      `
      <div class="user-info d-flex align-items-center mx-2">
        <img src="${user.profile_image}" alt="User Avatar" class="avatar mx-2">
        <span>${user.name}</span>
      </div>
    `
    );
    btnPost.classList.add("show");
  }
}

// /////////////////////register///////////////////

function register() {
  const formData = new FormData();

  formData.append("username", usernameRegister.value);
  formData.append("name", nameRegister.value);
  formData.append("password", passwordRegister.value);
  formData.append("image", registerImage.files[0]);
  toggleLodaer(true);
  axios
    .post(`${baseUrl}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      // console.log("hhhhh", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      showAlert("success", "User registered successfully.");
      setupUI();
      window.location.reload();
   
    })
    .catch(function (error) {
      // console.log(error);
      showAlert("error", error.response.data.message);
      const modalInstance = bootstrap.Modal.getInstance(modalRegister);
      modalInstance.show();
    })
    .finally(()=>{
      toggleLodaer(false);
    })
}

//////////////create post///////////////////

function createPost() {
  let token = localStorage.getItem("token");
  const formData = new FormData();
  let postId = document.getElementById("post-id-input").value;

  let isCreate = postId == null || postId == "";

  formData.append("body", postBody.value);
  formData.append("title", postTitle.value);

  // ✅ لو المستخدم اختار صورة جديدة فقط
  if (postImage.files.length > 0) {
    formData.append("image", postImage.files[0]);
  }

  let urlPost = "";

  if (isCreate) {
    urlPost = `${baseUrl}/posts`;
  } else {
    formData.append("_method", "put");
    urlPost = `${baseUrl}/posts/${postId}`;
  }

  toggleLodaer(true);
  axios
    .post(urlPost, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      showAlert(
        "success",
        isCreate
          ? "New Post Has been Created Successfully."
          : "Post Has been Updated Successfully."
      );

      if (window.location.pathname.includes("profile")) {
        getUserPosts();
        profileInfo(); // ✅ لتحديث عدد المشاركات
      } else {
        getPosts(true, 1);
      }
    

      
    })
    .catch(function (error) {
      // console.log(error);
      showAlert("error", error.message || "Something went wrong.");
      const modalInstance = bootstrap.Modal.getInstance(modalPost);
      modalInstance.show();
    }).finally(()=>{
      toggleLodaer(false);
    })
}

function getPost(id) {

  cardPostDetails.innerHTML = "";
  document.getElementById("comments").innerHTML = "";
  toggleLodaer(true);
 
  axios
    .get(`${baseUrl}/posts/${id}`)
    .then(function (response) {
      const post = response.data.data;
      const comments = post.comments;

      // console.log("Post Data:", post);
      // console.log("Comments Data:", comments);

      document.querySelector("#header-post-details").innerHTML =
        post.author.name;
    

      let tagsHTML = "";
      for (let tag of post.tags) {
        tagsHTML += `<button class="btn btn-sm rounded-5 mx-1" style="background-color:gray;">${tag.name}</button>`;
      }

      let commentsContent = "";
      for (let comment of comments) {
        commentsContent += `
          <div class="comment">
            <img src="${comment.author.profile_image}" alt="Comment User">
            <div class="comment-info">
              <div class="comment-user">${comment.author.name}</div>
              <div>${comment.body}</div>
            </div>
          </div>
        `;
      }

      let content = `
        <div class="card-body d-flex align-items-center">
          <div class='d-flex align-items-center' style='cursor: pointer;'>
            <img src="${post.author.profile_image}" alt="User Avatar" class="avatar me-2">
            <h6 class="mb-0">${post.author.name}</h6>
          </div>
        </div>
        <img src="${post.image}" class="card-img-top" alt="Post Image">
        <div class="card-body">
          <small class="text-muted">${post.created_at}</small>
          <h5 class="card-title mt-2">${post.title}</h5>
          <p class="card-text">${post.body}</p>
        </div>
        <div class="card-body post-footer">
          <small class="text-muted mx-1">
            <i class="fas fa-pencil-alt mx-1"></i> (${post.comments_count}) Comments
          </small>
          <span class="mx-3">${tagsHTML}</span>
        </div>
        <div id="comments">
          ${commentsContent}
        </div>
      `;

      cardPostDetails.innerHTML = content;
     
    })
    .catch(function (error) {
      showAlert("error", error.response.data.message);
     
    }).finally(()=>{
      toggleLodaer(false);
    })
}

function postClicked(postId) {
  window.location = `postDetails.html?postId=${postId}`;

  cardMain ? cardMain.insertAdjacentHTML("afterbegin", cartona) : null;
}

// create comment
if (document.querySelector("#button-comment")) {
  document
    .querySelector("#button-comment")
    .addEventListener("click", function () {
      createComment();
    });
}

function createComment() {
  let token = localStorage.getItem("token");
  toggleLodaer(true);
  axios
    .post(
      `${baseUrl}/posts/${postId}/comments`,
      {
        body: commentInput.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function (response) {
      let comment = response.data.data; // تأكد أنك تدخل إلى post وليس مباشرة response.

      // console.log("comment", comment);
      getPost(postId);

      commentInput.value = "";
      showAlert("success", "the comment has ben created successfully.");
 
    })
    .catch(function (error) {
      // console.error("Error loading post:", error.response.data.message);
      showAlert("error", error.response.data.message);
    }).finally(()=>{
      toggleLodaer(false);
    })
}

function editPostBtnClicked(post) {
  // post =JSON.parse(decodeURI(post));

  let postModal = new bootstrap.Modal(document.getElementById("modalPost"));
  postModal.toggle();
  document.getElementById("post-id-input").value = post.id;
  document.getElementById("modal-title").innerHTML = "Edit A Post";
  document.getElementById("btn-post-submit").innerHTML = "update";
  postTitle.value = post.title;
  postBody.value = post.body;
  // عرض الصورة الحالية
  const currentImage = document.getElementById("current-post-image");
  if (currentImage) {
    currentImage.src = post.image;
    currentImage.style.display = "block";
  }
  // currentImage.src = post.image;
  // currentImage.style.display = "block";
  // alert('hi')
}

function createBtnPost() {
  let postModal = new bootstrap.Modal(document.getElementById("modalPost"));
  postModal.toggle();

  let postInput = document.getElementById("post-id-input");
  if (postInput) postInput.value = "";

  let modalTitle = document.getElementById("modal-title");
  if (modalTitle) modalTitle.innerHTML = "Create A New Post";

  let submitBtn = document.getElementById("btn-post-submit");
  if (submitBtn) submitBtn.innerHTML = "create";

  if (postTitle) postTitle.value = "";
  if (postBody) postBody.value = "";
}


function deletePost(postId) {
  postIdToDelete = postId;

  const modal = new bootstrap.Modal(document.getElementById("deleteModal"));
  modal.show();
}

if (document.getElementById("confirmDeleteBtn")) {
  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", function () {
      let token = localStorage.getItem("token");
      toggleLodaer(true);
      axios
        .delete(`${baseUrl}/posts/${postIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          showAlert("success", "Post deleted successfully");
          if (window.location.pathname.includes("profile")) {
            getUserPosts(); // ✅ في صفحة البروفايل
            profileInfo();
          } else {
            getPosts(true, 1); // ✅ في الصفحة الرئيسية
          }
       
        })
        .catch((error) => {
          // console.error("Delete error", error);
          showAlert("error", "Failed to delete the post");
        })
        .finally(() => {
       
          const modalElement = document.getElementById("deleteModal");
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
      
        });
    });
}

function getCurrentUserId() {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userid");
  return userId;
}

function userClicked(userId) {
  // console.log(userId);

  window.location = `profile.html?userid=${userId}`;
}

////////////////// GET profile ifo ////////////////////////////
// {"username":"tarneem mohamed","name":"tarneem mohamed","email":null,"id":1969,"profile_image":"https://tarmeezacademy.com/images/users/kAF8HyjFXVfUehL.jpg","comments_count":14,"posts_count":0}
function profileInfo() {
  const id = getCurrentUserId();
  let user = JSON.parse(localStorage.getItem("user"));
  if (document.getElementById("card-profile-info")) {
    document.getElementById("card-profile-info").innerHTML = "";
  }
  let info = "";
  toggleLodaer(true);
  axios
    .get(`${baseUrl}/users/${id}`)
    .then((respose) => {
      // console.log("hiii", respose.data);
      let userInfo = respose.data.data;

      info = `
  
  
     <div class="col-4 image-profile">
    <img src="${
      userInfo.profile_image
    }" alt="User Avatar" class="user-avatar me-4">
    </div>
    <!-- email username -name -->
    <div class="col-4 profile-text-info">

    ${userInfo.email ? `<h5 class="mb-3">${userInfo.email}</h5>` : ""}
      <h5 class="mb-3">${userInfo.username}</h5>
      <h5 class="mb-3">${userInfo.name}</h5>
    
    </div>
    <div class="col-4">
      <div class="number-info"><span class="">${
        userInfo.posts_count
      }</span> Posts</div>
      <div class="number-info"><span class="">${
        userInfo.comments_count
      }</span>Comments</div>
    </div>
  </div>
  
  
  
  
  
  
  
  
  `;
      if (document.getElementById("card-profile-info")) {
        document.getElementById("card-profile-info").innerHTML = info;
      }
    
    })

    .catch(function (error) {
      showAlert("error", error.response.data.message);
    })
    .finally(()=>{
      toggleLodaer(false);
    })
}

if (document.getElementById("card-profile-info")) {
  profileInfo();
  getUserPosts();
}

getPosts();

function getUserPosts() {
  const id = getCurrentUserId();
  if (isRequesting) return;
  isRequesting = true;

  const userPostsContainer = document.getElementById("user-posts");
  if (userPostsContainer) {
    userPostsContainer.innerHTML = ""; // 🔄 مسح القديم
  }

  toggleLodaer(true);

  axios
    .get(`${baseUrl}/users/${id}/posts`)
    .then(function (response) {
      let data = response.data.data;
      let content = "";

      // ✅ عرض اسم المؤلف مرة واحدة فقط إذا فيه بيانات
      if (data.length > 0) {
        content += `<h1 class="mt-5"><span style="color:#1e1ebf">${data[0].author.name}</span>'s Posts</h1>`;
      }

      for (let post of data) {
        let tagsHTML = "";
        for (let tag of post.tags) {
          tagsHTML += `<button class="btn btn-sm rounded-5 mx-1" style="background-color:gray;" id="post-tags-${post.id}">${tag.name}</button>`;
        }

        let user = getCurrentUser();
        let isMyPost = user !== null && post.author.id == user.id;
        let editBtnContent = "";

        if (isMyPost) {
          editBtnContent = `
          <button class="btn btn-secondary" onclick="editPostBtnClicked(JSON.parse(decodeURIComponent('${encodeURIComponent(
            JSON.stringify(post)
          )}')))">
  <i class="fas fa-edit"></i>
</button>
<button class="btn btn-danger" onclick="deletePost(${post.id})">
  <i class="fas fa-trash-alt"></i>
</button>`;
        }

        content += `
        <div class="card post-card my-5" style="cursor: pointer;">
          <div class="card-body d-flex align-items-center">
            <div class='d-flex align-items-center' onclick='userClicked()' style='cursor: pointer;'>
              <img src="${post.author.profile_image}" alt="User Avatar" class="avatar me-2">
              <h6 class="mb-0">${post.author.name}</h6>
            </div>
            <div class='ms-auto'>
              ${editBtnContent}
            </div>
          </div>
          <div onclick="postClicked(${post.id})">
            <a><img src="${post.image}" class="card-img-top" alt="Post Image"></a>
            <div class="card-body">
              <small class="text-muted">${post.created_at}</small>
              <h5 class="card-title mt-2">${post.title}</h5>
              <p class="card-text">${post.body}</p>
            </div>
            <div class="card-body post-footer">
              <small class="text-muted mx-1">
                <i class="fas fa-pencil-alt mx-1"></i> (${post.comments_count}) Comments
              </small>
              <span class="mx-3">${tagsHTML}</span>
            </div>
          </div>
        </div>`;
      }

      if (userPostsContainer) {
        userPostsContainer.innerHTML = content;
      }

    
    })
    .catch(function (error) {
      showAlert("error", error.response.data.message);
    })
    .finally(() => {
      isRequesting = false;
      toggleLodaer(false);
    });
}

document
  .getElementById("nav-profile")
  .addEventListener("click", ProfileClicked);
function ProfileClicked() {
  let user = getCurrentUser();
  // alert(user.id);
  


    if (!user) {
      showAlert("error", "Login failed. Please log in first.");
      const modalInstance = new bootstrap.Modal(modalLogin);
      modalInstance.show();
    }
    else{
      window.location = `profile.html?userid=${user.id}`;
    }
  
}

function getCurrentUser() {
  let user = null;
  const storageUser = localStorage.getItem("user");

  if (storageUser != null) {
    user = JSON.parse(storageUser);
  }
  return user;
}

function toggleLodaer(showLodaer=true) {

  if (showLodaer) {
    // document.getElementById("spinner").style.display = "flex";
    document.getElementById("spinner").style.display = "flex";
  } else {
    // document.getElementById("spinner").style.display = "none";
    document.getElementById("spinner").style.display= "none";
  }
  
}
// function showSpinner() {
//   document.getElementById("spinner").style.display = "flex";
// }

// function hideSpinner() {
//   document.getElementById("spinner").style.display = "none";
// }