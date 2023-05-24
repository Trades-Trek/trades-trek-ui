import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import JoinCompetation from '../../components/Competition/JoinCompetition';
import MyCompetationView from '../../components/Competition/MyCompetitionView';
import CreateCompetation from '../../components/Competition/CreateCompetition';

export default function CompetationSummeryUserList() {
    const [beginnerOption, setBeginnerOption] = useState(false);
    return (
        <>
            <Sidebar />
            <div className="site--content competation-page">
                <div className="page--title--block">
                    <div className="grid--2">
                        <div className="grid-block-left wrapper--title">
                            <h3>Welcome, John Adams</h3>
                        </div>
                        <div className="grid-block-right right-align">
                            <div className="beginner-option">
                                Current Competition
                                <span
                                    className="btn"
                                    onClick={() => setBeginnerOption(!beginnerOption)}
                                >
                                    Beginners
                                </span>
                                {beginnerOption && (
                                    <div className="option--list">
                                        <ul>
                                            <li>Beginners </li>
                                            <li>Beginners 1</li>
                                            <li>Beginners 2</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card--wrapper learning-research'>
                    <div className="trade-data">
                        <div className=''>
                            <Tabs>
                                <TabList>
                                    <Tab>Summary</Tab>
                                    <Tab>My Competitions</Tab>
                                    <Tab>Join Competition</Tab>
                                    <Tab>Create Competition</Tab>
                                </TabList>
                                <TabPanel className="tab-content-gap card-no-gap">
                                    <div className='p-20'>
                                        <div className='userList flexBox'>
                                            <h4 className='font-16'>LEADERBOARD</h4>
                                            <Link href="#">
                                                <a className='text--purple'>Close</a>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="status-summary noRadius font-18 summery-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Rank</th>
                                                    <th>User</th>
                                                    <th>Account Value</th>
                                                    <th>Today’s Change</th>
                                                    <th>Overall Change</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#F45531"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#F45531"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#F45531"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox text-light-green'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#00FFA0"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox text-light-green'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#00FFA0"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox text-light-green'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#00FFA0"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox text-light-green'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#00FFA0"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox text-light-green'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#00FFA0"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>9</td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox text-light-green'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#00FFA0"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='flexBox'>
                                                            10 
                                                            <svg className="ml-12" width="10" height="10" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox text-light-green'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#00FFA0"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='flexBox'>
                                                            10 
                                                            <svg className="ml-12" width="10" height="10" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#F45531"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>JKM-Nissan Skyline R33 Nismo</td>
                                                    <td>$5,283,219,965,530.90</td>
                                                    <td className="text-red">
                                                        <div className='flexBox text-light-green'>
                                                            -$4.00 (NaN%)
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#00FFA0"></path></svg>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='flexBox text-light-green'>
                                                            52,832,199,555.31%
                                                            <svg className="ml-12" width="16" height="17" viewBox="0 0 18 18" fill="none">
                                                                <path d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z" fill="#00FFA0"/>
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-data">

                                    </div>
                                </TabPanel>
                                <TabPanel className="tab-content-gap">
                                    <div className='myCompetation'>
                                        <MyCompetationView />
                                    </div>
                                </TabPanel>
                                <TabPanel className="tab-content-gap">
                                    <div className='summeryData'>
                                        <JoinCompetation />
                                    </div>
                                </TabPanel>
                                <TabPanel className="tab-content-gap">
                                    <div className='summeryData'>
                                        <CreateCompetation />
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
