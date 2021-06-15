cube(`UniversityCampus`, {
  sql: `SELECT * FROM backenddb.university_campus`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        campusId,
        campusContentprofilecampusNamecity,
        campusContentprofilecampusNamecountry,
        campusCreatedby,
      ],
    },
  },

  dimensions: {
    campusId: {
      sql: `${CUBE}.\`campus._id\``,
      type: `string`,
      title: `Campus. Id`,
    },

    campusContentprofilecampusBachelordegrees: {
      sql: `${CUBE}.\`campus.contentProfileCampus.bachelorDegrees\``,
      type: `string`,
      title: `Campus.contentprofilecampus.bachelordegrees`,
    },

    campusContentprofilecampusBriefuniversity: {
      sql: `${CUBE}.\`campus.contentProfileCampus.briefUniversity\``,
      type: `string`,
      title: `Campus.contentprofilecampus.briefuniversity`,
    },

    campusContentprofilecampusBriefwhystudy: {
      sql: `${CUBE}.\`campus.contentProfileCampus.briefWhyStudy\``,
      type: `string`,
      title: `Campus.contentprofilecampus.briefwhystudy`,
    },

    campusContentprofilecampusLocation: {
      sql: `${CUBE}.\`campus.contentProfileCampus.location\``,
      type: `string`,
      title: `Campus.contentprofilecampus.location`,
    },

    campusContentprofilecampusMasterdegrees: {
      sql: `${CUBE}.\`campus.contentProfileCampus.masterDegrees\``,
      type: `string`,
      title: `Campus.contentprofilecampus.masterdegrees`,
    },

    campusContentprofilecampusNamecity: {
      sql: `${CUBE}.\`campus.contentProfileCampus.nameCity\``,
      type: `string`,
      title: `Campus.contentprofilecampus.namecity`,
    },

    campusContentprofilecampusNamecountry: {
      sql: `${CUBE}.\`campus.contentProfileCampus.nameCountry\``,
      type: `string`,
      title: `Campus.contentprofilecampus.namecountry`,
    },

    campusContentprofilecampusParagraphhighlight: {
      sql: `${CUBE}.\`campus.contentProfileCampus.paragraphHighlight\``,
      type: `string`,
      title: `Campus.contentprofilecampus.paragraphhighlight`,
    },

    campusContentprofilecampusParagraphuniversity: {
      sql: `${CUBE}.\`campus.contentProfileCampus.paragraphUniversity\``,
      type: `string`,
      title: `Campus.contentprofilecampus.paragraphuniversity`,
    },

    campusContentprofilecampusParagraphwhystudy: {
      sql: `${CUBE}.\`campus.contentProfileCampus.paragraphWhyStudy\``,
      type: `string`,
      title: `Campus.contentprofilecampus.paragraphwhystudy`,
    },

    campusContentprofilecampusPeoplehighlights: {
      sql: `${CUBE}.\`campus.contentProfileCampus.peopleHighlights\``,
      type: `string`,
      title: `Campus.contentprofilecampus.peoplehighlights`,
    },

    campusContentprofilecampusPhddegrees: {
      sql: `${CUBE}.\`campus.contentProfileCampus.phdDegrees\``,
      type: `string`,
      title: `Campus.contentprofilecampus.phddegrees`,
    },

    campusContentprofilecampusPopularprogramsparagraph: {
      sql: `${CUBE}.\`campus.contentProfileCampus.popularProgramsParagraph\``,
      type: `string`,
      title: `Campus.contentprofilecampus.popularprogramsparagraph`,
    },

    campusCreatedby: {
      sql: `${CUBE}.\`campus.createdBy\``,
      type: `string`,
      title: `Campus.createdby`,
    },

    campusImagesMainimageUrl: {
      sql: `${CUBE}.\`campus.images.mainImage.url\``,
      type: `string`,
      title: `Campus.images.mainimage.url`,
    },
  },

  dataSource: `default`,
});
