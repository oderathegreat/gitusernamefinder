import React, { useState } from 'react'

function Findprofile()
{
    const [userName, setUserName] = useState("");
    const [results, setResults] = useState([]);
    const [totals, setTotals] = useState([]);
    const [page, setPage] = useState(1);
    

    const onChangeHandler = (e) =>
    {
        setUserName(e.target.value)
    }

    const onSubmitHandler = (e) =>
    {
        e.preventDefault();
      
        const url = 'https://api.github.com/search/users?q=' + userName + '&&page=1&per_page=15'
       
        console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((data) =>
            {
                console.log(data)
                setResults(data.items);
                setTotals(data.total_count);
            })

    }

    const paginate = (value) =>
    {
        if (value == 'next') {
            setPage(page + 1)
            const url = 'https://api.github.com/search/users?q=' + userName + '&&page=' + page + '&per_page=15'
            fetch(url)
                .then((response) => response.json())
                .then((data) =>
                {
                    console.log(data)
                    setResults(data.items);
                    setTotals(data.total_count);
                })
            console.log(page)
        } else { 
            if (page > 1) {
                setPage(page - 1)
                const url = 'https://api.github.com/search/users?q=' + userName + '&&page=' + page + '&per_page=15'
                fetch(url)
                    .then((response) => response.json())
                    .then((data) =>
                    {
                        console.log(data)
                        setResults(data.items);
                        setTotals(data.total_count);
                    })
            } else { 
                alert('no page')
            }
        }

        

    }

    return (
        <>
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-indigo-600 tracking-wide uppercase"></h2>
                        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Enter Github Username</p>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <form id="myform" autoComplete='off' onSubmit={onSubmitHandler}>
                            <div className="col-lg-8 col-sm-12 my-2 form-group">
                                <input className="form-control form-control-lg" placeholder="Github username" type={userName} id="w" onChange={onChangeHandler} />
                            </div>
                            <div>
                                <div className="col-lg-3 col-sm-12 my-2 form-group">
                                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-xl font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Search</button>
                                    {/* <button className="btn btn-primary btn-block w-100 btn-lg">Search</button> */}
                                </div>
                                <div>
                                    <p>Results Found : {totals}</p>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>

            {/* {results.map((product) => (
                <div className='card'>
                    
                    <p>{product}</p>
                </div>
            ))} */}
            <div className="p-10">
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((result) => (
                        <a href={result.html_url} key={result.id} target="_blank" className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                            <div className="w-full flex items-center justify-between p-6 space-x-6">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="text-gray-900 text-sm font-medium truncate">{result.type}</h3>
                                        <h3 className="text-gray-900 text-sm font-medium truncate">{result.score}</h3>
                                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                            {result.login}
                                        </span>
                                    </div>
                                </div>
                                <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src={result.avatar_url} alt="" />
                            </div>
                        </a>
                    ))}
                </ul>
            </div>


            <div className="flex justify-center">

                <button onClick={() => paginate('previous')} className="px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed dark:bg-gray-900 dark:text-gray-600">
                    <div className="flex items-center -mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinejoin="round"  strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>

                        <span className="mx-1">
                            previous
                        </span>
                    </div>
                </button>

                <div className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                </div>

            
                <button onClick={() => paginate('next') } className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                    <div className="flex items-center -mx-1">
                        <span className="mx-1">
                            Next
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinejoin="round"  strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </button>

            </div>

        </>

    )
}

export default Findprofile;
