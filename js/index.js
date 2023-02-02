window.addEventListener("load", async () => {
  try {
    const res = await axios({
      url: "/dashboard",
      // headers: { Authorization: localStorage.getItem("token") },
    });
    console.log(res);
    const year = res.data.year;
    const sheet = echarts.init(document.getElementById("line"));
    console.log(year);
    const option = {
      title: {
        text: "2022全学科薪资走势",
        left: "2%",
        top: "2%",
      },
      xAxis: {
        type: "category",
        data: year.map((item) => item.year),
        axisLine: {
          lineStyle: {
            color: "#999",
            type: "dashed",
          },
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
      },
      tooltip: {
        trigger: "axis",
      },
      // grid: {
      //   left: "15%",
      //   top: "15%",
      //   right: "15%",
      //   bottom: "15%",
      // },
      series: [
        {
          data: year.map((item) => item.salary),
          type: "line",
          smooth: true,
          symbolSize: "10",
          lineStyle: {
            width: 5,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#92c6ff", // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      color: ["#62afff"],
    };
    sheet.setOption(option);
    const data = res.data.overview;
    for (const k in data) {
      document.querySelector(`[name="${k}"]`).innerHTML = data[k];
    }
  } catch (err) {
    console.log(err);
  }
});
