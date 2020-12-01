drop table if exists `opinions`;

create table `opinion`(
        `id` int(11) not null auto_increment,
        `openId` varchar(100) not null,
        `src` text default null,
        `wechat` varchar(100) default null,
        `opinion` text not null,
        `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
       PRIMARY KEY (`id`)
)default charset=`UTF8`

drop table if exists `record`;

create table `record`(
        `id` int(11) not null auto_increment,
        `openId` varchar(100) not null,
        `add` int(11) not null,
        `mark` int(11) not null,
        `note` varchar(100) default null,
        `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
       PRIMARY KEY (`id`)
)default charset=`UTF8`