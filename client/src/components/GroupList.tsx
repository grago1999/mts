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

	const getGroupList = () => {
		fetch("http://localhost:7000/answers/allanswers")
		.then(response => response.json())
		.then(groups => {
			groups = groups.map((g: any) => Object.assign({}, g, { hidden: true }))
			return setGroups(groups.sort((a: GroupItem, b: GroupItem) => a.count > b.count ? 1 : -1))
		})
	}
	
	useEffect(() => {
		if (groups.length === 0) {
			getGroupList()
		}
	}, [])

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
			{groups.length > 0 && groups.map((group: GroupItem, i: number) => {
				const id = `group_${i}`

				return (
					<div id={id} key={id} className="item">
						<h1>{i+1}</h1>
						<button onClick={() => show(group.name)}>{group.hidden ? "?" : group.name}</button>
					</div>
				)	
			})}
		</div>
	)
}

export default GroupList
