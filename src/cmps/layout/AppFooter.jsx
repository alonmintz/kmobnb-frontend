// import { useSelector } from 'react-redux'

export function AppFooter() {
	// const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer full">
			<p>&copy; Kmobnb 2025, Inc.</p>
			{/* <p>Count: {count}</p> */}
            
            {import.meta.env.VITE_LOCAL ? 
                <span className="local-services">Local Services</span> : 
                <span className="remote-services">Remote Services</span>}
		</footer>
	)
}