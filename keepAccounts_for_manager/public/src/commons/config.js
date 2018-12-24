export default {
	login: "/api/promoter/login",
  activities:{
    list_url:"/api/activities",
    detail_url:"/api/activities/:activityId",
    booth_detail:"/api/promoter/booths",
    house_url:"/api/house/find-by-activity/:activityId",
    plan_url:"/api/plan/find-by-house/:houseId"
  },
  statistics:{
    all_list:"/api/statistics/all",
    activities_list:"/api/statistics/activities",
    booths_list:"/api/statistics/booths",
    promoterSettle_statistics:"/api/promoter-settle/statistics",
    settleOrder_url:"/api/promoter-settle/settle-order"
  },
}
