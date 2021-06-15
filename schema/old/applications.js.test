cube(`Applications`, {
  sql: `SELECT * FROM applications`,
  preAggregations: {
    main: {
      sqlAlias: `original`,
      type: `originalSql`,
    },
  },
  joins: {
    Users: {
      relationship: `belongsTo`,
      sql: `${Applications}.user_id = ${Users}.id`,
    },
    Landings: {
      relationship: `belongsTo`,
      sql: `${Applications}.landing_id = ${Landings}.id`,
    },
  },
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, Landings.id],
    },
  },
  dimensions: {
    id: {
      type: `string`,
      sql: `id`,
      primaryKey: true,
      shown: true,
    },
    createdAt: {
      sql: `created_at`,
      type: `time`,
    },
    status: {
      sql: `status`,
      type: `string`,
    },
  },
});
