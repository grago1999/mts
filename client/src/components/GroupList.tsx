import { group } from "console"
import React, { useState, useEffect } from "react"
import "./groupList.css"

interface GroupItem {
	name: string,
	count: number,
	hidden: boolean
}

function GroupList() {
	const [groups, setGroups] = useState<GroupItem[]>([])

	const getGroupList = (previousGroups: GroupItem[] = []) => {
		fetch("http://localhost:7000/answers/allanswers")
		.then(response => response.json())
		.then(newGroups => {
			if (newGroups.length !== previousGroups.length || (previousGroups.length > 0 && newGroups.length > 0 && previousGroups[0].name !== newGroups[0].name)) {
				newGroups = newGroups.map((g: any) => Object.assign({}, g, { hidden: true }))
				newGroups.sort((a: GroupItem, b: GroupItem) => b.count - a.count)
				setGroups(newGroups)
			}
			setTimeout(() => getGroupList(newGroups), 5000)
		})
	}
	
	useEffect(() => getGroupList(), [])

	const show = (name: string) => {
		let newGroups: GroupItem[] = groups.map(group => {
			if (group.name === name) {
				group.hidden = false
			}
			return group
		})
		setGroups(newGroups)
	}

	return (
		<div id="group-list" className="list">
			{groups.map((group: GroupItem, i: number) => {
				const id = `group_${i}`

				return (
					<div id={id} key={id} className="item">
						<h1>{i+1}</h1>
						<button id={`${id}_button`} className="hiddenButton" onClick={() => show(group.name)}>{group.hidden ? "?" : group.name}</button>
					</div>
				)	
			})}
		</div>
	)
}

export default GroupList
