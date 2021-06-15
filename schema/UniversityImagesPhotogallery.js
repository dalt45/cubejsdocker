cube(`UniversityImagesPhotogallery`, {
  sql: `SELECT * FROM backenddb.\`university_images_photoGallery\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    imagesPhotogalleryUrl: {
      sql: `${CUBE}.\`images.photoGallery.url\``,
      type: `string`,
      title: `Images.photogallery.url`,
    },
  },

  dataSource: `default`,
});
