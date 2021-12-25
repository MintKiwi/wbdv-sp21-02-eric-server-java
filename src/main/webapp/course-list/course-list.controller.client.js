var $titleFld
var $seatFld
var $semesterFld
var $sectionFld
var $createBtn
var table
var courseService=new CoursesServiceClient()
var $updateBtn

var tableRows=[
   //   {Title :"CS4872", Section: "01", Seats: "50", Semester: "Spring"},
   //  {Title :"CS7318", Section: "02", Seats: "13", Semester: "Summer"},
   // {Title :"CS9810", Section: "03", Seats: "98", Semester: "Fall"}
]
var selectedCourse=null
function selectCourse(event){
    var button=$(event.target)
    var id=button.attr("id")
    selectedCourse=tableRows.find(course=>course._id===id)
    $titleFld.val(selectedCourse.Title)
    $seatFld.val(selectedCourse.Seats)
    $semesterFld.val(selectedCourse.Semester)
    $sectionFld.val(selectedCourse.Section)


}
function deleteCourse(event){
    var button=$(event.target)
    var id=button.attr("id")
    var theId=tableRows[id]._id
    courseService.deleteCourse(theId).then(function(status){
        tableRows.splice(id,1)
        renderCourses(tableRows)
    })

}
function renderCourses(tableRows){
    table.empty()
    for(var i=0;i<tableRows.length;i++){
        var course=tableRows[i]
        table.append(`
        <tr>
                    <td>${course.Title}</td>
                    <td>${course.Section}</td>
                    <td>${course.Seats}</td>
                    <td>${course.Semester}</td>
                    <td>
                        <button id="${i}" class="eric-delete-course">Delete</button>
                        <button id="${tableRows._id}" class="eric-select-course">Select</button>
                    </td>
        </tr>
        `)
    }
    $(".eric-delete-course").click(deleteCourse)
    $(".eric-delete-course").click(selectCourse)

}
// renderCourses(tableRows)

// var createBtn=$(".eric-create-btn")
// createBtn.click(function () {
//     var newCourse={
//         Title :"CS6957", Section: "06", Seats: "06", Semester: "Summer"
//     }
//     tableRows.push(newCourse)
//     renderCourses(tableRows)
//
// })



function createCourse(tableRows){
    courseService.createCourse(tableRows).then(function(actualCourses){
        tableRows.push(actualCourses)
        renderCourses(tableRows)
    })

}
function updateCourse(){
    selectedCourse.Section=$sectionFld.val()
    selectedCourse.Semester=$semesterFld.val()
    selectedCourse.Seats=$seatFld.val()
    selectedCourse.Title=$titleFld.val()
    courseService.updateCourse(selectedCourse._id,selectedCourse).then(function(status){
        var index= tableRows.findIndex(course=>course._id=== seletedCourse._id)
        tableRows[index]=selectedCourse
        renderCourses(tableRows)
    })
}

function init(){
    $titleFld=$(".eric-title")
    $seatFld=$(".eric-seats")
    $semesterFld=$(".eric-semester")
    $sectionFld=$(".eric-section")
    $createBtn=$(".eric-create-btn")
    table=$(".table-body")
    $updateBtn=$(".eric-update-btn")

    $updateBtn.click(updateCourse)
    $createBtn.click(function () {
        var newCourse= {
            Title:$titleFld.val(),
            Section:$sectionFld.val(),
            Seats:$seatFld.val(),
            Semester:$semesterFld.val()
        }
        createCourse(newCourse)
        $titleFld.val("")
        $sectionFld.val("")
        $seatFld.val("")
        $semesterFld.val("")


    })

    courseService.findAllCourses()
        .then(function(actualCourse){
            tableRows=actualCourse
            renderCourses(tableRows)
        })
}

$(init)