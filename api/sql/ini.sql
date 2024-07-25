/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80200
 Source Host           : localhost:3306
 Source Schema         : foolon-admin

 Target Server Type    : MySQL
 Target Server Version : 80200
 File Encoding         : 65001

 Date: 19/07/2024 11:13:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建用户id',
  `update_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新用户id',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '父菜单id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单路径',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组件路径',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `menu_type` tinyint(0) NOT NULL COMMENT '菜单类型:0-一级菜单,1-子菜单,2-权限',
  `perms` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '权限',
  `sort` int(0) NOT NULL DEFAULT 1 COMMENT '排序',
  `keepalive` tinyint(0) NOT NULL DEFAULT 1 COMMENT '是否缓存:0-不缓存,1-缓存',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '是否启用:0-停用,1-启用',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_b78075022af82852f74a4cf97b`(`status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('2024-07-16 15:08:30.310090', '2024-07-16 15:08:52.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '141cddc1-59f4-436d-b34c-876dc76c533d', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '在线用户', '/sys/SysOnline', '/sys/SysOnline.vue', NULL, 1, NULL, 3, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-26 15:18:56.114806', '2024-03-01 11:26:35.000000', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'ad59b6ce-18e3-46cb-815f-179159402b57', '2701d412-108b-4864-8a98-b44abeb0ed6a', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '菜单管理', '/sys/SysMenu', '/sys/SysMenu.vue', '', 1, NULL, 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-07-16 15:09:19.045036', '2024-07-16 15:09:19.045036', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '2a60bb81-950d-45ab-91fe-e0c3a7c993b6', '141cddc1-59f4-436d-b34c-876dc76c533d', '查询', NULL, NULL, NULL, 2, '/admin/sys/online/list', 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:49:37.798756', '2024-02-29 16:50:02.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '2caad99d-a738-4622-af40-cbbe344d4549', 'dc955259-11c2-468a-a45c-95da7beec342', '查询', NULL, NULL, NULL, 2, '/admin/sys/role/page,/admin/sys/role/id', 2, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:48:45.626399', '2024-02-29 16:48:52.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '359da62f-5cef-4be8-8877-984efe18437f', 'dc955259-11c2-468a-a45c-95da7beec342', '删除', NULL, NULL, NULL, 2, '/admin/sys/role/delete', 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-03-14 16:45:55.092706', '2024-03-14 16:48:03.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '4a594cfb-cec6-436c-9d04-0148546d5ed0', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '新增', NULL, NULL, NULL, 2, '/admin/sys/user/create,/admin/sys/user/import', 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:47:14.155895', '2024-02-29 16:47:14.155895', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '539d486c-e0f2-41f0-aaca-d58f81008421', '2701d412-108b-4864-8a98-b44abeb0ed6a', '新增修改', NULL, NULL, NULL, 2, '/admin/sys/menu/save,/admin/sys/menu/import', 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:51:22.714482', '2024-02-29 16:51:22.714482', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '7cb2d261-000e-4d66-9587-a1d1f346f74c', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '查询', NULL, NULL, NULL, 2, '/admin/sys/user/page,/admin/sys/user/id', 2, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-26 15:19:30.239868', '2024-02-26 15:19:30.239868', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '用户管理', '/sys/SysUser', '/sys/SysUser.vue', NULL, 1, NULL, 2, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-03-15 11:56:39.667480', '2024-03-15 11:56:39.667480', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '8f48a1cd-5ba5-40a8-a9e2-6aa791a47217', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '修改密码', NULL, NULL, NULL, 2, '/admin/sys/user/password', 4, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-27 16:08:49.647997', '2024-02-27 16:08:49.647997', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '9336c0e8-8add-41f9-8d7e-e8cb9cdda060', 'bd39b140-850a-460f-ac0a-921f6cfc8168', '表单Demo', '/demo/SchemaFormDemo', '/demo/SchemaFormDemo.vue', NULL, 1, NULL, 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:50:56.290508', '2024-02-29 16:50:59.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '97ffaade-20cb-48eb-a10b-82587a91f888', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '删除', NULL, NULL, NULL, 2, '/admin/sys/user/delete', 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-26 15:18:38.908273', '2024-03-01 11:06:36.000000', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'ad59b6ce-18e3-46cb-815f-179159402b57', '9c7fdede-3078-4937-aaad-eb4499d9f25f', NULL, '系统设置', '/sys', NULL, 'Setting', 0, NULL, 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-27 16:09:04.822472', '2024-02-27 16:09:04.822472', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'a765d1c0-8c95-420f-8054-dec6049b1f34', 'bd39b140-850a-460f-ac0a-921f6cfc8168', '表格Demo', '/demo/SchemaTableDemo', '/demo/SchemaTableDemo.vue', NULL, 1, NULL, 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:47:55.942824', '2024-02-29 16:49:07.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'b7c4e78e-b01c-4e17-9457-affedbe49f51', '2701d412-108b-4864-8a98-b44abeb0ed6a', '删除', NULL, NULL, NULL, 2, '/admin/sys/menu/delete', 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-27 16:08:19.544955', '2024-03-01 11:06:28.000000', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'bd39b140-850a-460f-ac0a-921f6cfc8168', NULL, '组件Demo', '/demo', NULL, 'DataBoard', 0, NULL, 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:47:34.472196', '2024-02-29 16:49:46.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'cfce0604-de8a-4e2b-a8b4-882462a27fd2', '2701d412-108b-4864-8a98-b44abeb0ed6a', '查询', NULL, NULL, NULL, 2, '/admin/sys/menu/page,/admin/sys/menu/id', 2, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-26 15:19:14.787369', '2024-02-26 15:19:14.787369', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'dc955259-11c2-468a-a45c-95da7beec342', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '角色管理', '/sys/SysRole', '/sys/SysRole.vue', NULL, 1, NULL, 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-03-14 16:46:19.269447', '2024-03-14 16:46:19.269447', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'f4e93bd3-f5f3-4449-9668-53307e23c603', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '修改', NULL, NULL, NULL, 2, '/admin/sys/user/update', 3, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:48:20.535785', '2024-02-29 16:48:20.535785', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'f5820fc4-8df3-4907-b353-47d9aa6811dc', 'dc955259-11c2-468a-a45c-95da7beec342', '新增修改', NULL, NULL, NULL, 2, '/admin/sys/role/save,/admin/sys/role/import', 0, 1, 1);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建用户id',
  `update_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新用户id',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色描述',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '是否启用:0-停用,1-启用',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_5618342313765224322c7e317d`(`status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('2024-07-15 10:11:16.646401', '2024-07-15 10:11:16.646401', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '4845c1b6-9089-435a-936f-5a31271d6fac', '测试2', NULL, 1);
INSERT INTO `sys_role` VALUES ('2024-02-28 09:13:18.032904', '2024-02-28 09:13:18.032904', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '8e418709-fea2-4e64-be29-59035533cee9', 'admin', NULL, 1);
INSERT INTO `sys_role` VALUES ('2024-03-08 14:54:51.303422', '2024-03-18 10:49:37.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'cb196ef8-6916-4883-9719-70f42cfdf042', '测试1', NULL, 1);

-- ----------------------------
-- Table structure for sys_role_menus_sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menus_sys_menu`;
CREATE TABLE `sys_role_menus_sys_menu`  (
  `sysRoleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sysMenuId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`sysRoleId`, `sysMenuId`) USING BTREE,
  INDEX `IDX_e7c90b5f1eae0da649c74cfbcb`(`sysRoleId`) USING BTREE,
  INDEX `IDX_c6e4b76cb3f4ab1028f2461963`(`sysMenuId`) USING BTREE,
  CONSTRAINT `FK_c6e4b76cb3f4ab1028f24619635` FOREIGN KEY (`sysMenuId`) REFERENCES `sys_menu` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_e7c90b5f1eae0da649c74cfbcb4` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menus_sys_menu
-- ----------------------------
INSERT INTO `sys_role_menus_sys_menu` VALUES ('4845c1b6-9089-435a-936f-5a31271d6fac', '2701d412-108b-4864-8a98-b44abeb0ed6a');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('4845c1b6-9089-435a-936f-5a31271d6fac', '539d486c-e0f2-41f0-aaca-d58f81008421');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('4845c1b6-9089-435a-936f-5a31271d6fac', '9336c0e8-8add-41f9-8d7e-e8cb9cdda060');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('4845c1b6-9089-435a-936f-5a31271d6fac', '9c7fdede-3078-4937-aaad-eb4499d9f25f');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('4845c1b6-9089-435a-936f-5a31271d6fac', 'a765d1c0-8c95-420f-8054-dec6049b1f34');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('4845c1b6-9089-435a-936f-5a31271d6fac', 'b7c4e78e-b01c-4e17-9457-affedbe49f51');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('4845c1b6-9089-435a-936f-5a31271d6fac', 'bd39b140-850a-460f-ac0a-921f6cfc8168');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('4845c1b6-9089-435a-936f-5a31271d6fac', 'cfce0604-de8a-4e2b-a8b4-882462a27fd2');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '141cddc1-59f4-436d-b34c-876dc76c533d');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '2701d412-108b-4864-8a98-b44abeb0ed6a');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '2a60bb81-950d-45ab-91fe-e0c3a7c993b6');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '2caad99d-a738-4622-af40-cbbe344d4549');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '359da62f-5cef-4be8-8877-984efe18437f');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '4a594cfb-cec6-436c-9d04-0148546d5ed0');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '539d486c-e0f2-41f0-aaca-d58f81008421');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '7cb2d261-000e-4d66-9587-a1d1f346f74c');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '8b9e25b8-a7ff-4562-885a-79eed8d1f456');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '8f48a1cd-5ba5-40a8-a9e2-6aa791a47217');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '9336c0e8-8add-41f9-8d7e-e8cb9cdda060');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '97ffaade-20cb-48eb-a10b-82587a91f888');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '9c7fdede-3078-4937-aaad-eb4499d9f25f');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'a765d1c0-8c95-420f-8054-dec6049b1f34');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'b7c4e78e-b01c-4e17-9457-affedbe49f51');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'bd39b140-850a-460f-ac0a-921f6cfc8168');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'cfce0604-de8a-4e2b-a8b4-882462a27fd2');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'dc955259-11c2-468a-a45c-95da7beec342');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'f4e93bd3-f5f3-4449-9668-53307e23c603');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'f5820fc4-8df3-4907-b353-47d9aa6811dc');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('cb196ef8-6916-4883-9719-70f42cfdf042', '9336c0e8-8add-41f9-8d7e-e8cb9cdda060');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('cb196ef8-6916-4883-9719-70f42cfdf042', 'a765d1c0-8c95-420f-8054-dec6049b1f34');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('cb196ef8-6916-4883-9719-70f42cfdf042', 'bd39b140-850a-460f-ac0a-921f6cfc8168');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建用户id',
  `update_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新用户id',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户账户',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `realname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码盐',
  `iv` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '初始向量',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态:0-无效,1-有效',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_9e7164b2f1ea1348bc0eb0a7da`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('2024-03-15 17:11:56.861149', '2024-03-15 17:11:56.861149', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '68da91ad-693b-4753-90ac-21fa567d09ee', 'test1', 'e70fe2a5d6fee5438fd7', '测试1', '813da00e7da3186b66ae9537b8278045', 'b49fd6bc1b9a23307345709a0f03f26c', NULL, NULL, NULL, 1);
INSERT INTO `sys_user` VALUES ('2024-03-18 11:06:26.394380', '2024-07-15 10:16:59.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '6978988b-e41c-43e6-96ba-85bcf98e5f63', 'test', 'fbf556268dd2dcf2278a', '测试', '594c2adcb089b631075867e61584c35f', '7d5bb17d5f407699b75e7f0d8a739ba6', '', NULL, NULL, 1);
INSERT INTO `sys_user` VALUES ('2024-02-27 16:02:03.690395', '2024-03-18 11:20:11.000000', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'admin', 'ef41db7fe07444a389a0', '超级管理员', 'b441dd01381ecc7b5cae4a53b25b3a6f', '70cf546ed04983342410f0e013377d40', 'avatar-1710731502204-512417899.webp', '374166002@qq.com', '15324682154', 1);

-- ----------------------------
-- Table structure for sys_user_roles_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_roles_sys_role`;
CREATE TABLE `sys_user_roles_sys_role`  (
  `sysUserId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sysRoleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`sysUserId`, `sysRoleId`) USING BTREE,
  INDEX `IDX_d1daac450217c1a1e384e99254`(`sysUserId`) USING BTREE,
  INDEX `IDX_45602f09af1715f5532db91a43`(`sysRoleId`) USING BTREE,
  CONSTRAINT `FK_45602f09af1715f5532db91a43d` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_d1daac450217c1a1e384e99254a` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_roles_sys_role
-- ----------------------------
INSERT INTO `sys_user_roles_sys_role` VALUES ('ad59b6ce-18e3-46cb-815f-179159402b57', '8e418709-fea2-4e64-be29-59035533cee9');

SET FOREIGN_KEY_CHECKS = 1;