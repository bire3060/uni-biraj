// &city__in=${city}&category__in=${category}&
// degree_level__in=${degree_level}&duration__in=${duration}
// &study_mode__in=${study_mode}&study_load__in=${study_load}`




// else if(category||city||duration||study_load||study_mode||degree_level){
//     console.log("tyr")

//    axiosInstance
//    .get(
//       `/courses/course-filter/?page=${currentButton}&city__in=${city}&category__in=${category}&
//       degree_level__in=${degree_level}&duration__in=${duration}
//       &study_mode__in=${study_mode}&study_load__in=${study_load}`,

//      { signal }
//    )
//    .then((res) => {
//      setMainLoader(false);
//      console.log(res.data)
//      dispatch({
//        type: COURSE_COUNT,
//        payload: res.data.count,
//      });



//      setCourseCount(res.data.count);

//      setCourses(res.data.results);


//      setPage(res.data.total_pages);
   

  


//      dispatch({ type: COURSE_DATA, payload: { ...courses } });


//    })
//    .catch((err) => {
//      console.error(err);
//      setMainLoader(false);
//      setErrorLoader(true);
//      setTimeOutError(false);
//      toast.error("Something went wrong", {
//        position: "top-right",
//        autoClose: 2000,
//        hideProgressBar: false,
//        closeOnClick: true,
//        pauseOnHover: true,
//        draggable: true,
//        progress: undefined,
//      });
//    });

//   }



















// else if (tryCategory || tryCity || tryDuration || tryDegree) {
//     axiosInstance
//       .get(
//         `/courses/course-filter/?page=${currentButton}
//   &${tryCity && `city__in=${tryCity}`}
//   &${tryDegree && `degree_level__in=${tryDegree}`}
//   &${tryCategory && `category__in=${tryCategory}`}
//   &${tryDuration && `duration__in=${tryDuration}`}
//   &study_mode__in=${study_mode || ""}&study_load__in=${study_load || ""}`,

//         { signal }
//       )
//       .then((res) => {
//         setMainLoader(false);
//         console.log(res.data);
//         dispatch({
//           type: COURSE_COUNT,
//           payload: res.data.count,
//         });

//         setCourseCount(res.data.count);

//         setCourses(res.data.results);

//         setPage(res.data.total_pages);

//         dispatch({ type: COURSE_DATA, payload: { ...courses } });
//       })
//       .catch((err) => {
//         console.error(err);
//         setMainLoader(false);
//         setErrorLoader(true);
//         setTimeOutError(false);
//         toast.error("Something went wrong", {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       });
//   }   




<CourseCard
addToCompare={addToCompare}
closePopup={closePopup}
key={index}
{...course}
/>