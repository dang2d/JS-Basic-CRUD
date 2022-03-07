var listCourseBox = document.querySelector('#courses-list');
var coursesApi = 'http://localhost:3000/courses';

getCourses();

// Func get courses
function getCourses() {
    fetch(coursesApi)
        .then(function(resp) {
            return resp.json();
        })
        .then(renderCourses)
};

// Func render courses
function renderCourses(courses) {
    let coursesHtml = '';
    courses.forEach(function(course) {
        coursesHtml += `
            <li class="course-item-${course.id}">
                <h3>Name: ${course.name}</h3>
                <p>Description: ${course.desc}</p>
                <button type="button" onclick="deleteCourse(${course.id})">Xóa</button>
                <button type="button" onclick="handleCourse(${course.id})">Sửa</button>
            </li>
        `;
    });
    // console.log(coursesHtml);
    listCourseBox.innerHTML = coursesHtml;
};

// Func add course
function addCourse() {
    let courseName = document.querySelector('input[name="name"]').value;
    let courseDesc = document.querySelector('input[name="desc"]').value;
    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="desc"]').value = '';
    fetch(coursesApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: courseName,
            desc: courseDesc
        })
    })
        .then(getCourses)
};

// Func delete course
function deleteCourse(id) {
    fetch(`${coursesApi}/${id}`, {
        method: 'DELETE',
    })
        .then(function() {
            let courseItem = document.querySelector(`.course-item-${id}`);
            courseItem.remove();
        })
};

// Func handle course
function handleCourse(id) {
    fetch(`${coursesApi}/${id}`)
        .then(function(courses) {
            return courses.json();
        })
        .then(function(course) {
            let courseItem = document.querySelector(`.course-item-${id}`);
            courseItem = `
                <div id="update-box">
                    <h3>Update Course</h3>
                    <form>
                        <label for="name">Name</label>
                        <input type="text" name="courseName" placeholder="Course Name"><br><br>
                        <label for="desc">Name</label>
                        <input type="text" name="courseDesc" placeholder="Course Description"><br><br>
                        <button onclick="updateCourse(${course.id})" type="button">Update Course</button>
                    </form>
                </div>
            `;
            document.querySelector(`.course-item-${id}`).innerHTML = courseItem;
            document.querySelector('input[name="courseName"]').value = course.name;
            document.querySelector('input[name="courseDesc"]').value = course.desc;
        })
};

// Func update course
function updateCourse(id) {
    let courseName = document.querySelector('input[name="courseName"]').value;
    let courseDesc = document.querySelector('input[name="courseDesc"]').value;
    fetch(`${coursesApi}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: courseName,
            desc: courseDesc
        })
    })
        .then(function() {
            let courseItem = document.querySelector('#update-box');
            courseItem = `
                <li class="course-item-${id}">
                    <h3>Name: ${courseName}</h3>
                    <p>Description: ${courseDesc}</p>
                    <button type="button" onclick="deleteCourse(${id})">Xóa</button>
                    <button type="button" onclick="handleCourse(${id})">Sửa</button>
                </li>
            `;
            document.querySelector('#update-box').innerHTML = courseItem;
        })
};