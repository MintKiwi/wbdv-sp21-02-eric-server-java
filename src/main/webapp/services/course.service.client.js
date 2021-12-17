function CoursesServiceClient() {
    this.createCourse = createCourse;
    this.findAllCourses = findAllCourses;
    this.findCourseById = findCourseById;
    this.deleteCourse = deleteCourse;
    this.updateCourse = updateCourse;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001560015/courses ';
    var self = this;
    function createCourse(courses) {
        return fetch(self.url, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(courses)
        }).then(function(response){
            return response.json()
        })
    }
    function findAllCourses() {
        var promise=fetch(self.url)
        promise.then(function(response){

            return response.json()
        })
    }
    function findCourseById(courseId){ ... }
    function updateCourse(courseId, course) { return fetch(`${self.url}/${courseId}`, {
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(course)
    }).then(response=>response.json())}
    function deleteCourse(courseId){
        return fetch(`${self.url}/${courseId}`,
            {method:`DELETE`})
    }
}