cube(`UniversityCampusImagesPhotogallery`, {
  sql: `SELECT * FROM backenddb.\`university_campus_images_photoGallery\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    campusImagesPhotogalleryUrl: {
      sql: `${CUBE}.\`campus.images.photoGallery.url\``,
      type: `string`,
      title: `Campus.images.photogallery.url`,
    },
  },

  dataSource: `default`,
});
