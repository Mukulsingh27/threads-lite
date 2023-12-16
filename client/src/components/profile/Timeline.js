import React from 'react'
import './timeline.scss'

const Timeline = () => {
  return (
	<div>
		<ol class="timeline">
			<li class="timeline-item">
				<span class="timeline-item-icon avatar-icon">
					<i class="avatar">
						<img src="https://assets.codepen.io/285131/hat-man.png" alt=""/>
					</i>
				</span>
				<div class="new-comment">
					<input type="text" placeholder="Add a comment..." />
				</div>
			</li>
			<li class="timeline-item | extra-space">
				<span class="timeline-item-icon filled-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<path fill="none" d="M0 0h24v24H0z" />
						<path fill="currentColor" d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z" />
					</svg>
				</span>
				<div class="timeline-item-wrapper">
					<div class="timeline-item-description">
						<span><a href="#">Yoan Almedia</a> commented on <time datetime="20-01-2021">Jan 20, 2021</time></span>
					</div>
					<div class="comment">
						<p>I've sent him the assignment we discussed recently, he is coming back to us this week. Regarding to our last call, I really enjoyed talking to him and so far he has the profile we are looking for. Can't wait to see his technical test, I'll keep you posted and we'll debrief it all together!😊</p>
					</div>
				</div>
			</li>
		</ol>
	</div>
  )
}

export default Timeline