// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract PollContract {
    // 结构体：每个投票的基本信息
    struct Poll {
        uint pollId;               // 投票ID
        address creator;           // 发起人
        string title;              // 标题
        string description;        // 描述
        string[] options;          // 投票选项
        uint[] votes;              // 计票数组，与options一一对应
        bool active;               // 是否正在进行
        uint startTime;            // 投票开始时间（可选）
        uint endTime;              // 投票结束时间（可选）
    }

    uint public pollCount;               // 累计投票数，pollId自增
    mapping(uint => Poll) public polls;  // pollId => Poll
    mapping(uint => mapping(address => bool)) public hasVoted; 
    // 记录某个pollId下某地址是否已投票

    // 事件：新建投票 / 用户投票
    event PollCreated(uint pollId, address creator);
    event Voted(uint pollId, address voter, uint optionIndex);

    // 创建投票
    function createPoll(
        string memory _title,
        string memory _description,
        string[] memory _options,
        uint _startTime,
        uint _endTime
    ) external {
        require(_options.length > 0, "No options provided");
        require(_startTime < _endTime, "Start time must be before end time");

        pollCount++;
        uint[] memory votesInit = new uint[](_options.length);

        polls[pollCount] = Poll({
            pollId: pollCount,
            creator: msg.sender,
            title: _title,
            description: _description,
            options: _options,
            votes: votesInit,
            active: true,
            startTime: _startTime,
            endTime: _endTime
        });

        emit PollCreated(pollCount, msg.sender);
    }

    // 投票
    function vote(uint _pollId, uint _optionIndex) external {
        Poll storage poll = polls[_pollId];
        require(poll.active, "Poll not active");
        require(block.timestamp >= poll.startTime, "Poll not started");
        require(block.timestamp <= poll.endTime, "Poll ended");
        require(!hasVoted[_pollId][msg.sender], "You have already voted");
        require(_optionIndex < poll.options.length, "Invalid option index");

        poll.votes[_optionIndex] += 1;
        hasVoted[_pollId][msg.sender] = true;

        emit Voted(_pollId, msg.sender, _optionIndex);
    }

    // 结束投票（如果想允许发起人手动结束）
    function endPoll(uint _pollId) external {
        Poll storage poll = polls[_pollId];
        require(msg.sender == poll.creator, "Only creator can end poll");
        require(poll.active, "Poll already ended");
        poll.active = false;
    }

    // 获取所有投票的简要信息
    // 警告：一次性返回所有投票在实际应用里可能昂贵，请考虑分页或事件方式
    function getAllPolls() external view returns (Poll[] memory) {
        Poll[] memory all = new Poll[](pollCount);
        for (uint i = 1; i <= pollCount; i++) {
            all[i - 1] = polls[i];
        }
        return all;
    }

    // 根据 pollId 获取单个投票详情
    function getPoll(uint _pollId) external view returns (
        uint, address, string memory, string memory, 
        string[] memory, uint[] memory, bool, uint, uint
    ) {
        Poll storage p = polls[_pollId];
        return (
            p.pollId,
            p.creator,
            p.title,
            p.description,
            p.options,
            p.votes,
            p.active,
            p.startTime,
            p.endTime
        );
    }

    // 获取某用户发起的所有投票
    function getMyPolls(address _owner) external view returns (uint[] memory) {
        // 简化写法：遍历 pollCount
        // 在链上这样做，Gas 成本可能高，需要注意大规模应用时的可扩展性
        uint[] memory temp = new uint[](pollCount);
        uint count = 0;
        for (uint i = 1; i <= pollCount; i++) {
            if (polls[i].creator == _owner) {
                temp[count] = i;
                count++;
            }
        }
        // 拷贝到一个合适长度的数组
        uint[] memory result = new uint[](count);
        for (uint j = 0; j < count; j++) {
            result[j] = temp[j];
        }
        return result;
    }
}
