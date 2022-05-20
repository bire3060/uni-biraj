import createInstitute from "./create-institute";

const addNewInstitute = async (
  basicDetail,
  facilities,
  awards,
  documents,
  images
) => {
  const newBasicDetail = { ...basicDetail };
  delete newBasicDetail.errors;

  // const formData = new FormData();
  // formData.append("basicDetail", newBasicDetail);
  // formData.append("facilities", facilities);
  // formData.append("awards", awards);
  // formData.append("documents", documents);
  // formData.append("gallery", images);
  const sendingObj = {
    basicDetail: newBasicDetail,
    facilities,
    awards,
    documents,
    images,
  };

  const institute = await createInstitute(sendingObj);
  // console.log(institute);
  // if (institute.id) {
  //   let id = institute.id;
  //   const facilityResponse = await createFacility({
  //     institute: id,
  //     facilities,
  //   });

  //   const awardResponse = await createAwardAndAchievement({
  //     institute: id,
  //     awards,
  //   });

  //   console.log(awardResponse);
  // }
};

export default addNewInstitute;
