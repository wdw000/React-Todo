import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTodos, Todo } from "../todoSlice";
import { addListCnt, selectListCnt, subListCnt } from "./chartSlice";
import "./TodoChart.css";

interface TodoData {
  date: string;
  todos: Todo[];
}

export default function TodoChart() {
  const allTodos = useSelector(selectAllTodos);
  const listCnt = useSelector(selectListCnt);
  const dispatch = useDispatch();

  function gettodoData() {
    const data: TodoData[] = [];
    const todoDates = new Set(
      allTodos
        .map((item) => item.end_date)
        .sort()
        .reverse()
    );
    todoDates.forEach((item) => {
      const todos = allTodos.filter((todo) => todo.end_date === item);
      const thisTodo: TodoData = {
        date: item,
        todos: todos,
      };

      data.push(thisTodo);
    });

    if (data.length > listCnt) {
      return data.slice(0, listCnt);
    }

    return data;
  }

  function getChartData() {
    const todoData = gettodoData();

    const categories: string[] = [];
    const completed: number[] = [];
    const progress: number[] = [];

    todoData.forEach((item) => {
      const done = item.todos.filter((todo) => todo.completed === true).length;

      completed.push(done);
      progress.push(item.todos.length - done);
      categories.push(item.date.slice(2));
    });

    const series: ApexOptions["series"] = [
      {
        name: "완료",
        data: completed,
      },

      {
        name: "진행",
        data: progress,
      },
    ];

    const chart: ApexChart = {
      stacked: true,
      toolbar: {
        show: false,
      },
    };

    const plotOptions: ApexPlotOptions = {
      bar: {
        horizontal: true,
      },
    };

    const xaxis: ApexXAxis = {
      categories: categories,
    };

    const legend: ApexLegend = {
      position: "top",
      horizontalAlign: "left",
    };

    const result = {
      options: {
        chart: chart,
        plotOptions: plotOptions,
        xaxis: xaxis,
        legend: legend,
      },
      series: series,
    };

    return result;
  }

  const data = getChartData();

  return (
    <div className="TodoChart">
      <div className="chart-list-counter">
        <span>리스트 수</span>
        <button className="click" onClick={() => dispatch(subListCnt())}>
          -
        </button>
        <div>{listCnt}</div>
        <button className="click" onClick={() => dispatch(addListCnt())}>
          +
        </button>
      </div>

      <div className="chart">
        <ReactApexChart
          type="bar"
          options={data.options}
          series={data.series}
          height={"100%"}
        />
      </div>
    </div>
  );
}
