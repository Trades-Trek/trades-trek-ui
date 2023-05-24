import React from "react";
import LeadersData from "./LeaderData";
import { LeadersList } from "./LeaderList";

export default function LeaderView() {
    return (
      <>
        <div className="card--style card--list--style">
          <table>
            <thead>
              <tr>
                <th>Sector</th>
                <th>MKT CAP</th>
                <th>Div Yeild Fwd</th>
                <th>CHG%</th>
              </tr>
            </thead>
            <tbody>
              {LeadersList.map((data, index) => {
                if (index <= 7) {
                  return <LeadersData key={index} listLeaderData={data} />;
                }
              })}
            </tbody>
          </table>
        </div>
      </>
    );
}

export const LeaderView2 = () => {
    return (
      <>
        <div className="card--style card--list--style">
          <table>
            <thead>
              <tr>
                <th>Sector</th>
                <th>MKT CAP</th>
                <th>Div Yeild Fwd</th>
                <th>CHG%</th>
              </tr>
            </thead>
            <tbody>
              {LeadersList.map((data, index) => {
                return <LeaderView2 key={index} listLeaderData={data} />;
              })}
            </tbody>
          </table>
        </div>
      </>
    );
}