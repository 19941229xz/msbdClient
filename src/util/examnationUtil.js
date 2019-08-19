import axios from 'axios'

axios.defaults.baseURL = 'https://www.bitcoc.top'


/**
 * @param {Object} itemUrl
 * 查询已审核的相关岗位试题数据量
 */
var getQuestionCount = async function(itemUrl,questionJobTypeId){
	
	var searchData = {
		"model": {
			isChecked: 2,
			questionJobTypeId:questionJobTypeId
		},
		"orderParams": [
		],
		"pageNum": 1,
		"pageSize": 1
	}
	
	var res = await axios.post(itemUrl,searchData)
	
	return res.data.content.total
	
}

/**
 * 查询试题
 */
var getQuestion = async function(searchData){
	var res = await axios.post('/msbd/getAllQuestion',searchData)
	return res.data.content.list[0]
}



export default {
	getQuestionCount,
	getQuestion
}