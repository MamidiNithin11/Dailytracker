import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import Header from '../Header'
import MoodTrackerContext from '../../context/MoodTrackerContext'
import './index.css'

const Reports = () => (
  <MoodTrackerContext.Consumer>
    {value => {
      const {
        emojisListNew,
        calenderList,
        calenderReportList,
        reportCalenderMonth,
        onReportCalenderChange,
      } = value

      return (
        <>
          <Header />

          <div className="reports-container">
            <h1 className="section-heading">Overall Emoji Report</h1>
            <ul className="emoji-summary-list">
              {emojisListNew.map(item => (
                <li key={item.id} className="emoji-card">
                  <p className="emoji-name">{item.emojiName}</p>
                  <img
                    src={item.emojiUrl}
                    alt={item.emojiName}
                    className="emoji-img"
                  />
                  <p className="emoji-count">{item.count}</p>
                </li>
              ))}
            </ul>
            <div className="monthly-header">
              <h1 className="section-heading">Monthly Reports</h1>

              <select
                className="month-select"
                value={reportCalenderMonth}
                onChange={onReportCalenderChange}
              >
                {calenderList.map(item => (
                  <option key={item.month} value={item.month}>
                    {item.monthName}
                  </option>
                ))}
              </select>
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={calenderReportList}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis
                    dataKey="emojiName"
                    tick={({x, y, payload}) => {
                      const emoji = calenderReportList.find(
                        item => item.emojiName === payload.value,
                      )
                      return (
                        <image
                          x={x - 12}
                          y={y + 8}
                          width={24}
                          height={24}
                          href={emoji?.emojiUrl}
                        />
                      )
                    }}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#FFC94A"
                    barSize={40}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )
    }}
  </MoodTrackerContext.Consumer>
)

export default Reports
