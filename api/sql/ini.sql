/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80200
 Source Host           : localhost:3306
 Source Schema         : kuaishou-admin

 Target Server Type    : MySQL
 Target Server Version : 80200
 File Encoding         : 65001

 Date: 09/08/2024 16:54:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for kuaishou_account
-- ----------------------------
DROP TABLE IF EXISTS `kuaishou_account`;
CREATE TABLE `kuaishou_account`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `account_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint(0) NULL DEFAULT 1,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `all_Station` tinyint(0) NULL DEFAULT 0,
  `all_Station_type` tinyint(0) NULL DEFAULT 0,
  `sort` tinyint(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_76ab7b4287c7d1cdac1a98bddc`(`account_id`) USING BTREE,
  INDEX `FK_5ece1bc3be37306078505548bd2`(`userId`) USING BTREE,
  CONSTRAINT `FK_5ece1bc3be37306078505548bd2` FOREIGN KEY (`userId`) REFERENCES `kuaishou_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kuaishou_account
-- ----------------------------
INSERT INTO `kuaishou_account` VALUES ('2023-11-27 07:15:21.288426', '2023-11-27 07:15:21.288426', '0b165bbf-06bd-490e-b704-82a2de4dfc2b', '22929883', 1, '055113d8-7126-4d05-81a5-f1326bee75c3', 0, 0, 0);
INSERT INTO `kuaishou_account` VALUES ('2023-11-27 02:55:31.540652', '2023-12-07 07:22:46.000000', '1e40b8df-31f0-4f63-b9f1-65e666911b4f', '19777883', 1, 'c08ac35c-6469-436a-90c6-90f80d82874e', 0, 0, 1);
INSERT INTO `kuaishou_account` VALUES ('2023-11-28 01:29:26.110764', '2023-11-28 01:29:26.110764', '325c0d45-03e3-4490-bfc4-2ba81f0dbcd1', '12597273', 1, '8b7eaffe-10c2-43b1-99f7-d20055dde235', 1, 0, 0);
INSERT INTO `kuaishou_account` VALUES ('2023-11-27 07:15:05.998517', '2023-11-27 07:15:05.998517', '4e25593f-5473-4ef2-a27c-720c141aee76', '22929885', 1, '055113d8-7126-4d05-81a5-f1326bee75c3', 0, 0, 0);
INSERT INTO `kuaishou_account` VALUES ('2023-12-01 00:45:33.392739', '2023-12-07 07:38:53.000000', '92f8f85f-9757-4a57-8efe-94298926b895', '15134357', 1, '8e7539cf-06b5-4eee-8bee-45b5ade252a7', 0, 0, 1);
INSERT INTO `kuaishou_account` VALUES ('2023-11-28 01:29:36.595322', '2023-11-28 01:29:36.595322', '98ba8acd-bc22-4495-9918-d56035b49eed', '20734485', 1, '8b7eaffe-10c2-43b1-99f7-d20055dde235', 0, 0, 0);
INSERT INTO `kuaishou_account` VALUES ('2023-11-27 07:15:13.769047', '2023-11-27 07:15:13.769047', 'b50e3303-f484-4da3-915d-9ba9e711bb10', '22929884', 1, '055113d8-7126-4d05-81a5-f1326bee75c3', 0, 0, 0);
INSERT INTO `kuaishou_account` VALUES ('2023-12-01 00:45:26.124169', '2023-12-07 07:38:58.000000', 'da108f47-09eb-4761-9b05-f35300cd45fd', '15120615', 1, '8e7539cf-06b5-4eee-8bee-45b5ade252a7', 0, 0, 0);
INSERT INTO `kuaishou_account` VALUES ('2023-12-01 00:45:14.231993', '2023-12-07 07:22:57.000000', 'defa9e52-c3e5-4e00-9309-bf46172a0528', '15136077', 1, '8e7539cf-06b5-4eee-8bee-45b5ade252a7', 1, 1, 2);
INSERT INTO `kuaishou_account` VALUES ('2023-11-27 02:56:54.917423', '2023-11-27 02:56:54.917423', 'e4b5d3f2-c0c4-4f9e-a2db-439a9198fef0', '19777884', 1, 'c08ac35c-6469-436a-90c6-90f80d82874e', 0, 0, 0);

-- ----------------------------
-- Table structure for kuaishou_user
-- ----------------------------
DROP TABLE IF EXISTS `kuaishou_user`;
CREATE TABLE `kuaishou_user`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kuaishou_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cookies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `status` tinyint(0) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_9f45ba538c0ba0f9e86c09fbbd`(`kuaishou_id`) USING BTREE,
  UNIQUE INDEX `IDX_2d1f1b9a20b3d1aa5ea75bc0e7`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kuaishou_user
-- ----------------------------
INSERT INTO `kuaishou_user` VALUES ('2023-11-27 07:12:48.690525', '2023-11-27 07:12:48.690525', '055113d8-7126-4d05-81a5-f1326bee75c3', '218579463', '京阳车坊汽车用品', '_did=web_9408473309753E89; did=web_75fdd8500c417fdabad0b4fde045010e8b69; app_id=ks670191923238046957; expire_time=1800; access_token=ChFvYXV0aC5hY2Nlc3NUb2tlbhIwx96eRJZrlowhzyVGESxtZkXPodQXcDDjcMkD9NyFsHS9Jb3WTsYMYudBvT9PvGRcGhJ0lNpl9NtFt7jM9LzyFTTPFEciIEgBHyXkYvUDOZAOuvWUGis7t-6f5lC5pgHarx1edHwNKAUwAQ; nc_user_id=CiVhZC5ub3RpZnkuY2VudGVyLm9hdXRoLnVzZXIuaWQuc2VjcmV0EiAb4Xh6LUSBUJFm+l0MY3UN9WaEHNupU6BFpu5xulVJKhoS+vDrRFbVUE1d74dCxjUbNcRSIiALK9LgilpAa+iltia/GoNRDmx3iHB4lG96nHANXRkUaygFMAE=; apdid=276e6a98-fa33-47e2-975e-f5f885d6d745acebc80b1b3a2f4f0c8985899b5a8fee:1698648605:1; userId=218579463; pluto-ratio-/=16766_30@-1; Hm_lvt_b97569d26a525941d8d163729d284198=1700005006; Hm_lpvt_b97569d26a525941d8d163729d284198=1701066636; kuaishou.ad.esp_st=ChJrdWFpc2hvdS5hZC5lc3Auc3QSoAGNLefhtEwJiyFQ4izSicbq5bK1q9ZuFNHKwgN5bRJ51EmKJVaxaxzX25HcYYS_uK0kuEColsTpk6h5XIoGlD5_uCaq3O3kQgIWYAemvxf0k1JYTzniu0kW8yIRYQEXVrNLfId2BdHuLK6Qb7FFOV-1UJ9icp9O_RoMDxDtqDE3Ed241B8kbO38R9jV4BW0asCpnbiEHnMelxraIe4EJ8QBGhJUWEepflUSU4IJoWLm1IV8u5ciIF07EwYN4jSb7wWyvByVBS5pcx24WxD8EWvFIpjb_Av8KAUwAQ; kuaishou.ad.esp_ph=df1eaa7e198adc0a8cbccdb5acae76d3aff8', 1);
INSERT INTO `kuaishou_user` VALUES ('2023-11-28 01:28:21.293549', '2023-11-28 01:28:21.293549', '8b7eaffe-10c2-43b1-99f7-d20055dde235', '2412003968', '开荒牛汽车用品', '_did=web_985466892BB020C9; did=web_3b7d4d97e59180432295abe5656c5c329f04; app_id=ks670191923238046957; expire_time=1800; access_token=ChFvYXV0aC5hY2Nlc3NUb2tlbhIwwglEDq8hhi5s9PjyyZ6RPqN4YlM8mNHR-K_pfLMP41o6waD4iYWtT51J2HiHFC-5GhI4jxc1xH1K15kfx1GQn1SwLvsiIODikWNjI94yimiGbpe30BPk9n52pFZvFdQT3J7a2zunKAUwAQ; nc_user_id=CiVhZC5ub3RpZnkuY2VudGVyLm9hdXRoLnVzZXIuaWQuc2VjcmV0EiDfKHV9umK2ebnV4DxX/ag6L5/2+odQ4ObHCxPnf6VnJBoSpLC2wggcbUXXKrtpws7VgnfYIiBzPDGdzH28scwLCQDGK2dQ4DJc1lRTzaP4SczkhhF72CgFMAE=; Hm_lvt_e8002ef3d9e0d8274b5b74cc4a027d08=1695053445; userId=2412003968; Hm_lvt_b97569d26a525941d8d163729d284198=1699790763,1699932978; pluto-ratio-/=16766_30@-1; Hm_lpvt_b97569d26a525941d8d163729d284198=1701084241; kuaishou.ad.esp_st=ChJrdWFpc2hvdS5hZC5lc3Auc3QSoAFOOSLTS5zwY0nWK52kDVyb_bSYSpF6BJuq73u9a5wP9HvQreVIeOOLjzeWbg7hWJ4la_ha4hPv87tVuHeVj5EzlZxWXYJeeobVlbI-ZhEKAHqA7pGjwZuTJtL6r2iesRJ1eXRdyGxDFem-hHj5NR8hrh-eos_ty89Brc_DDeeN9zxBCJ2rU4bn08TB0L57jS8tPbuBqQGdbYnt4Eqibh2KGhIGCBbMGgdepRezebKarAj8R7wiIJ3YZbkt5m5dDFWOrJP1vxM6GiOh8sknqN30HBwi4IU0KAUwAQ; kuaishou.ad.esp_ph=64fde79db62949cac37b383dbf29c25bcdb6', 1);
INSERT INTO `kuaishou_user` VALUES ('2023-12-01 00:44:53.683486', '2023-12-01 00:44:53.683486', '8e7539cf-06b5-4eee-8bee-45b5ade252a7', '2978308311', '扬子暖风机工厂', 'kGateway-identity=kGateway-30122c91-778332712; _did=web_2740391799141FE2; did=web_1e873b9a9c7c092321e7535793e4ea0296ea; apdid=d3133598-ab38-4e54-b699-e0dacd381f78a4b2b725620817bef7a1827eb2e895c6:1697105510:1; app_id=ks670191923238046957; expire_time=1800; access_token=ChFvYXV0aC5hY2Nlc3NUb2tlbhIw1Z6tWlILfDIwso7Bx4wYLB6bF6dDOmn4g53x8yEpt10lKO2Eq37klYGoMC1wz_rWGhIgQfvkqD5FqqWtQ2y0WGxSDjAiIAETjg8KI7Hg-1dqATlyHlIXy8BGDim2FGA5jvmN2KFxKAUwAQ; nc_user_id=CiVhZC5ub3RpZnkuY2VudGVyLm9hdXRoLnVzZXIuaWQuc2VjcmV0EiCW+8kNshLtfNCSEYV9Mq2UyPA/RDj8Y4Ak5RiNnjYjgxoSNbq54AjWxRMHkvyITmb13oqgIiDnNrjphYz3WStw4kVOdGcfZR1Rsh16xLSDZPYIO6kx1CgFMAE=; userId=2978308311; pluto-ratio-/=16766_30@-1; Hm_lvt_b97569d26a525941d8d163729d284198=1699675389,1700010264; Hm_lpvt_b97569d26a525941d8d163729d284198=1701313731; kuaishou.ad.esp_st=ChJrdWFpc2hvdS5hZC5lc3Auc3QSoAFtBjK39kQ1aYg4U3-2kXoNw2pFaUFUKXqki90Vsq34px9ECQamSvA93knTMlbS7bVe8Si4HEjSnqYFIHUHYbqnBijn1cmp9i0QaV7JqDONaC4AUAUBu5st_ygwxhd07nnJNmEDrDIt-MnvWHmszESTeKYL_ViiZmTaqZT5wQC9X_FqztAXK_kF5Z6Rt7SO3jLFOzRxFQUZiht48o4Rd6nxGhIgYwkZNu9o0yTtKSqyad6vjZQiIDuEGAX2Bm7L9_QFfX7bSqdKQQBJlWGQVZucf52e-vcNKAUwAQ; kuaishou.ad.esp_ph=5cdf4cf6390d5529e2dfefb86a1f74e715e2', 1);
INSERT INTO `kuaishou_user` VALUES ('2023-11-27 02:33:26.813900', '2023-11-27 02:33:26.813900', 'c08ac35c-6469-436a-90c6-90f80d82874e', '2765294189', '雕盾防水材料', '_did=web_43216917553D4182; did=web_3fedc3fabda62e23e8986dc8b74fb13eca7b; app_id=ks670191923238046957; expire_time=1800; access_token=ChFvYXV0aC5hY2Nlc3NUb2tlbhIwByX5J8RJhX9RzUwMVxX8Gx_Nnpvz6aXsYUjukRebwwA5wHVwNv_BzbrnS7ONJd8wGhIAEuN-HvJNPLUOKVV1NaFEgHAiIEGLMKzPe8inHCNMD1URKk1TtC0itHaGlQqpFg4B2RG_KAUwAQ; nc_user_id=CiVhZC5ub3RpZnkuY2VudGVyLm9hdXRoLnVzZXIuaWQuc2VjcmV0EiDfLjpYgx1wBtLVL/W74UndowKObrGr3o+RgpaEgomAJRoS15vWPnzcRWSsWdw+hR26xK9AIiAolmD7d7ilf1nbXj9pnU/9zwwYeiTGFUCWT3SICD6CHygFMAE=; Hm_lvt_e8002ef3d9e0d8274b5b74cc4a027d08=1695046269; Hm_lvt_b97569d26a525941d8d163729d284198=1697248543,1699589329; userId=2765294189; pluto-ratio-/=16766_30@-1; kuaishou.ad.esp_st=ChJrdWFpc2hvdS5hZC5lc3Auc3QSoAGa8goTXp4ys5Y-9NCX6EdfPXsVukaexqt89MTtxA0K5WA6k7m5OIPXI5tInzSFRMoNX1AmMfd9jpHXcNtT2hcQOgfb8JusybcMPmKgwTys0m6I7oEoQkFugnfklvw54RZ2hEiKa1mQy-cezWf_qk6IhPGjc7cW4mbTPN3hG9hWv18w93SY_o-SHPFww7gfzGh24PcZ0iK2Vy6Lm3x8i39JGhKCZ4iiiZ27_3o1Z-jBmUyxVzciIKx-6m8G1GS0mW7098fPBLE-Is2m6YQbg59kcj8aBWKvKAUwAQ; kuaishou.ad.esp_ph=5ccd265583e6db78e44296630437f31f0ab5', 1);

-- ----------------------------
-- Table structure for kuaishou_warning
-- ----------------------------
DROP TABLE IF EXISTS `kuaishou_warning`;
CREATE TABLE `kuaishou_warning`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `accountId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `threshold` float NOT NULL COMMENT '警告阈值',
  `type` tinyint(0) NOT NULL DEFAULT 0 COMMENT '0-小于等于，1-大于等于',
  `enablingStatus` tinyint(0) NOT NULL DEFAULT 0 COMMENT '0-禁用，1-启用',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_5f981b50cfa0a57a86deb900b2`(`accountId`) USING BTREE,
  UNIQUE INDEX `REL_5f981b50cfa0a57a86deb900b2`(`accountId`) USING BTREE,
  INDEX `FK_defc3180488243d30f81d6fa97c`(`userId`) USING BTREE,
  CONSTRAINT `FK_5f981b50cfa0a57a86deb900b20` FOREIGN KEY (`accountId`) REFERENCES `kuaishou_account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_defc3180488243d30f81d6fa97c` FOREIGN KEY (`userId`) REFERENCES `kuaishou_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kuaishou_warning
-- ----------------------------
INSERT INTO `kuaishou_warning` VALUES ('2024-01-04 08:19:17.523092', '2024-01-04 08:42:20.000000', 'c7e62f5e-d483-4084-a1a0-6f8557a817ef', '8e7539cf-06b5-4eee-8bee-45b5ade252a7', '92f8f85f-9757-4a57-8efe-94298926b895', 4, 0, 1);
INSERT INTO `kuaishou_warning` VALUES ('2024-01-04 08:19:35.685454', '2024-01-04 08:42:20.000000', 'd033b0aa-8d6c-44f3-903e-a745ddd81d55', '8b7eaffe-10c2-43b1-99f7-d20055dde235', '325c0d45-03e3-4490-bfc4-2ba81f0dbcd1', 5, 0, 1);

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_2c363c25cf99bcaab3a7f389ba`(`key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES ('2021-09-28 03:14:05.256120', '2022-09-18 05:00:59.000000', 1, 'sys_user_initPassword', '初始密码', '123456', '创建管理员账号的初始密码');
INSERT INTO `sys_config` VALUES ('2023-12-06 08:10:09.315239', '2023-12-06 08:10:09.315239', 4, 'email', 'roi预警邮箱', '374166002@qq.com', NULL);
INSERT INTO `sys_config` VALUES ('2023-12-07 02:10:26.018448', '2023-12-07 02:10:26.018448', 5, 'every', '预警间隔', '5', NULL);

-- ----------------------------
-- Table structure for sys_department
-- ----------------------------
DROP TABLE IF EXISTS `sys_department`;
CREATE TABLE `sys_department`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `parent_id` int(0) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `order_num` int(0) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_department
-- ----------------------------
INSERT INTO `sys_department` VALUES ('2020-08-27 03:33:19.000000', '2023-11-23 08:37:56.000000', 1, NULL, '超级管理员', 0);

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_login_log`;
CREATE TABLE `sys_login_log`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NULL DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  `ua` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `login_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '登录地点',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_login_log
-- ----------------------------
INSERT INTO `sys_login_log` VALUES ('2023-11-23 08:31:06.527175', '2023-11-23 08:31:06.527175', 1, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.9 Safari/537.36', '内网IP');
INSERT INTO `sys_login_log` VALUES ('2023-11-23 08:41:27.953262', '2023-11-23 08:41:27.953262', 2, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.9 Safari/537.36', '内网IP');
INSERT INTO `sys_login_log` VALUES ('2023-11-23 09:03:17.066229', '2023-11-23 09:03:17.066229', 3, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.9 Safari/537.36', '内网IP');
INSERT INTO `sys_login_log` VALUES ('2023-11-23 09:14:52.879968', '2023-11-23 09:14:52.879968', 4, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.9 Safari/537.36', '内网IP');
INSERT INTO `sys_login_log` VALUES ('2023-11-23 09:30:31.278620', '2023-11-23 09:30:31.278620', 5, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.9 Safari/537.36', '内网IP');
INSERT INTO `sys_login_log` VALUES ('2023-12-05 07:27:04.966481', '2023-12-05 07:27:04.966481', 6, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.160 Safari/537.36', '内网IP');
INSERT INTO `sys_login_log` VALUES ('2023-12-07 02:19:18.876531', '2023-12-07 02:19:18.876531', 7, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.160 Safari/537.36', '内网IP');
INSERT INTO `sys_login_log` VALUES ('2023-12-07 03:25:07.473573', '2023-12-07 03:25:07.473573', 8, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.160 Safari/537.36', '内网IP');
INSERT INTO `sys_login_log` VALUES ('2024-01-04 08:18:57.133258', '2024-01-04 08:18:57.133258', 9, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.160 Safari/537.36', '内网IP');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `parent_id` int(0) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `router` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `perms` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '类型: 0=目录 1=菜单 2=权限',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `order_num` int(0) NULL DEFAULT 0,
  `view_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `keepalive` tinyint(0) NULL DEFAULT 1,
  `is_show` tinyint(0) NULL DEFAULT 1,
  `is_ext` tinyint(0) NULL DEFAULT 0,
  `open_mode` tinyint(0) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 106 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('2020-08-28 10:09:26.322745', '2023-10-24 11:34:19.960925', 1, NULL, '系统', '/sys', NULL, 0, 'icon-shezhi', 255, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-01 00:00:00.000000', '2023-10-24 11:34:19.970221', 3, 1, '权限管理', '/sys/permssion', NULL, 0, 'icon-quanxian', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-08 00:00:00.000000', '2023-10-24 11:34:19.974586', 4, 3, '用户列表', '/sys/permssion/user', NULL, 1, 'icon-yonghu', 0, 'system/permission/user/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2023-10-24 11:34:19.977914', 5, 4, '新增', NULL, 'sys:user:add', 2, NULL, 0, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2023-10-24 11:34:19.980369', 6, 4, '删除', NULL, 'sys:user:delete', 2, NULL, 0, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-08 00:00:00.000000', '2023-10-24 11:34:19.983471', 7, 3, '菜单列表', '/sys/permssion/menu', NULL, 1, 'icon-tiaoxingtu', 0, 'system/permission/menu/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2023-10-24 11:34:19.988540', 8, 7, '新增', NULL, 'sys:menu:add', 2, NULL, 0, NULL, 0, 0, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2023-10-24 11:34:19.990730', 9, 7, '删除', NULL, 'sys:menu:delete', 2, NULL, 0, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-02 08:22:27.548410', '2023-10-24 11:34:19.992331', 10, 7, '查询', NULL, 'sys:menu:list,sys:menu:info', 2, NULL, 0, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-04 06:26:36.408290', '2023-10-24 11:34:19.993908', 17, 16, '测试', '', 'sys:menu:list,sys:menu:update,sys:menu:info,sys:menu:add', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-04 08:08:53.621419', '2023-10-24 11:34:19.995203', 19, 7, '修改', '', 'sys:menu:update', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2021-04-12 04:28:03.312443', '2023-10-24 11:34:19.996322', 20, 4, '部门移动排序', NULL, 'sys:dept:move', 2, NULL, 255, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-04 09:41:43.133191', '2023-10-24 11:34:19.997317', 23, 3, '角色列表', '/sys/permission/role', '', 1, 'icon-jiaosequanxian', 0, 'system/permission/role/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-07 02:44:27.663925', '2023-10-24 11:34:19.998492', 25, 23, '删除', '', 'sys:role:delete', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-07 07:08:18.106272', '2023-10-24 11:34:20.001891', 28, 23, '新增', '', 'sys:role:add', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-07 08:51:48.319938', '2023-10-24 11:34:20.003064', 29, 23, '修改', '', 'sys:role:update', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-07 10:39:50.396350', '2023-10-24 11:34:20.004095', 32, 23, '查询', '', 'sys:role:list,sys:role:page,sys:role:info', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-08 05:29:40.117403', '2023-10-24 11:34:20.005200', 33, 4, '部门查询', '', 'sys:dept:list,sys:dept:info', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-09 07:10:08.435753', '2023-10-24 11:34:20.006446', 34, 4, '查询', '', 'sys:user:page,sys:user:info', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-10 05:09:31.904519', '2023-10-24 11:34:20.007551', 35, 4, '更新', '', 'sys:user:update', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-10 08:02:29.853643', '2023-10-24 11:34:20.008502', 36, 4, '部门转移', '', 'sys:dept:transfer', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-11 04:34:00.379002', '2023-10-24 11:34:20.009611', 37, 1, '系统监控', '/sys/monitor', '', 0, 'icon-jiankong1', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-11 06:12:14.621531', '2023-10-24 11:34:20.010751', 39, 4, '部门新增', '', 'sys:dept:add', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-11 06:13:23.752133', '2023-10-24 11:34:20.011799', 40, 4, '部门删除', '', 'sys:dept:delete', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-11 06:29:52.437621', '2023-10-24 11:34:20.013064', 41, 4, '部门更新', '', 'sys:dept:update', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-12 10:00:49.463487', '2023-10-24 11:34:20.015337', 51, 37, '在线用户', '/sys/monitor/online', NULL, 1, 'icon-zaixianyonghujiankong', 0, 'system/monitor/online/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-13 03:01:13.787832', '2023-10-24 11:34:20.016391', 52, 51, '查询', '', 'sys:online:list', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-13 03:01:51.480667', '2023-10-24 11:34:20.017580', 53, 51, '下线', '', 'sys:online:kick', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-13 09:52:08.932501', '2023-10-24 11:34:20.018704', 55, 37, '登录日志', '/sys/monitor/login-log', NULL, 1, 'icon-guide', 0, 'system/monitor/login-log/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-13 09:56:13.285772', '2023-10-24 11:34:20.019830', 56, 55, '查询', '', 'sys:log:login:page', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 03:07:18.221647', '2023-10-24 11:34:20.020826', 57, 1, '任务调度', '/sys/schedule', NULL, 0, 'icon-rizhi1', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 03:08:15.925726', '2023-10-24 11:34:20.022095', 58, 57, '定时任务', '/sys/schedule/task', NULL, 1, 'icon-dingshirenwuguanli', 0, 'system/schedule/task/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 03:08:36.247678', '2023-10-24 11:34:20.023478', 59, 58, '查询', '', 'sys:task:page,sys:task:info', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 03:09:09.436949', '2023-10-24 11:34:20.024733', 60, 58, '新增', '', 'sys:task:add', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 03:09:42.895534', '2023-10-24 11:34:20.025896', 61, 58, '更新', '', 'sys:task:update', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 05:45:30.512641', '2023-10-24 11:34:20.026985', 62, 58, '执行一次', '', 'sys:task:once', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 05:46:01.910857', '2023-10-24 11:34:20.028107', 63, 58, '运行', '', 'sys:task:start', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 05:46:23.694028', '2023-10-24 11:34:20.029181', 64, 58, '暂停', '', 'sys:task:stop', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 06:25:52.225518', '2023-10-24 11:34:20.030270', 65, 58, '删除', '', 'sys:task:delete', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 07:30:18.456330', '2023-10-24 11:34:20.031355', 66, 57, '任务日志', '/sys/schedule/log', NULL, 1, 'icon-rizhi1', 0, 'system/schedule/log/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-10-19 08:09:49.063343', '2023-10-24 11:34:20.032385', 67, 66, '查询', '', 'sys:log:task:page', 2, '', 0, '', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2021-04-21 08:54:41.018924', '2023-10-24 11:34:20.033609', 68, 4, '更改密码', NULL, 'sys:user:password', 2, NULL, 255, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2022-03-11 01:20:42.194253', '2023-10-24 11:34:20.034903', 69, 37, '服务监控', '/sys/monitor/serve', NULL, 1, 'zaixianyonghujiankong', 255, 'system/monitor/serve/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2022-03-11 01:22:47.542216', '2023-10-24 11:34:20.036022', 70, 37, '请求日志', '/sys/schedule/req-log', NULL, 1, 'zhexiantu', 255, 'system/monitor/req-log/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2021-09-28 03:22:42.570291', '2023-10-24 11:34:20.052217', 85, 1, '参数配置', '/sys/param-config', NULL, 0, 'xitongcanshupeizhi', 255, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2021-09-28 03:25:47.197582', '2023-10-24 11:34:20.053124', 86, 85, '参数列表', '/sys/param-config/list', NULL, 1, 'kehucanshupeizhi', 255, 'system/param-config/config-list.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2021-09-28 03:26:27.243134', '2023-10-24 11:34:20.054057', 87, 86, '查询', NULL, 'sys:param-config:page,sys:param-config:info', 2, NULL, 255, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2021-09-28 07:56:03.132765', '2023-10-24 11:34:20.055060', 88, 86, '新增', NULL, 'sys:param-config:add', 2, NULL, 255, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2021-09-28 07:56:26.180445', '2023-10-24 11:34:20.056199', 89, 86, '删除', NULL, 'sys:param-config:delete', 2, NULL, 255, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2021-09-28 07:56:47.269451', '2023-10-24 11:34:20.057185', 90, 86, '更新', NULL, 'sys:param-config:update', 2, NULL, 255, NULL, 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2023-11-23 08:42:44.646017', '2023-12-01 07:25:51.000000', 97, NULL, '磁力金牛', '/kuaishou', NULL, 0, 'qingbaojiankong', 1, NULL, 1, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2023-11-23 09:20:44.385325', '2023-11-23 09:26:41.000000', 99, 97, '用户管理', '/kuaishou/user', '', 1, '', 255, 'kuaishou/user/index.vue', 1, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2023-11-23 09:29:56.312612', '2023-11-27 02:21:52.000000', 100, 99, '用户管理', NULL, 'kuaishou:user:add,kuaishou:user:info,kuaishou:user:page,kuaishou:user:update,kuaishou:user:delete,kuaishou:user:list', 2, NULL, 255, NULL, 1, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2023-11-27 02:21:18.483079', '2023-11-28 01:42:27.000000', 101, 97, '广告账户', '/kuaishou/account', NULL, 1, '', 255, 'kuaishou/account/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2023-11-27 02:21:40.593434', '2023-11-27 02:21:40.593434', 102, 101, '广告账户', NULL, 'kuaishou:account:add,kuaishou:account:info,kuaishou:account:page,kuaishou:account:update,kuaishou:account:delete', 2, NULL, 255, NULL, 1, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2023-11-27 03:53:39.315795', '2023-11-28 07:58:48.000000', 103, 97, '财务报表', '/kuaishou/report', NULL, 1, '', 255, 'kuaishou/report/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2023-11-27 03:53:55.083977', '2023-11-29 08:10:49.000000', 104, 103, '财务报表', NULL, 'kuaishou:report:page,kuaishou:report:export,kuaishou:report', 2, NULL, 255, NULL, 1, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2023-12-05 03:18:26.025069', '2023-12-05 03:18:48.000000', 105, 97, 'ROI预警', '/kuaishou/warning', NULL, 1, '', 255, 'kuaishou/warning/index.vue', 0, 1, 0, 1);
INSERT INTO `sys_menu` VALUES ('2023-12-05 03:19:14.151322', '2023-12-05 03:19:14.151322', 106, 105, 'ROI预警', NULL, 'kuaishou:warning:add,kuaishou:warning:info,kuaishou:warning:page,kuaishou:warning:update,kuaishou:warning:delete,kuaishou:warning:enable,kuaishou:warning:disable,kuaishou:user:list,kuaishou:account:list', 2, NULL, 255, NULL, 1, 1, 0, 1);

-- ----------------------------
-- Table structure for sys_req_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_req_log`;
CREATE TABLE `sys_req_log`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `action` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `method` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int(0) NULL DEFAULT NULL,
  `consume_time` int(0) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_req_log
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_223de54d6badbe43a5490450c3`(`name`) USING BTREE,
  UNIQUE INDEX `IDX_f2d07943355da93c3a8a1c411a`(`label`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('2020-08-27 03:35:05.000000', '2020-08-27 03:35:05.000000', 1, 'root', 'root', '超级管理员', NULL);

-- ----------------------------
-- Table structure for sys_role_department
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_department`;
CREATE TABLE `sys_role_department`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `role_id` int(0) NOT NULL,
  `department_id` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_department
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `role_id` int(0) NOT NULL,
  `menu_id` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 155 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------

-- ----------------------------
-- Table structure for sys_task
-- ----------------------------
DROP TABLE IF EXISTS `sys_task`;
CREATE TABLE `sys_task`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `service` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` tinyint(0) NOT NULL DEFAULT 0,
  `status` tinyint(0) NOT NULL DEFAULT 1,
  `start_time` datetime(0) NULL DEFAULT NULL,
  `end_time` datetime(0) NULL DEFAULT NULL,
  `limit` int(0) NULL DEFAULT 0,
  `cron` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `every` int(0) NULL DEFAULT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `job_opts` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_ef8e5ab5ef2fe0ddb1428439ef`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_task
-- ----------------------------
INSERT INTO `sys_task` VALUES ('2020-10-19 08:54:42.760785', '2024-01-08 10:57:06.000000', 2, '定时清空登录日志', 'SysLogClearJob.clearLoginLog', 0, 1, NULL, NULL, 0, '0 0 3 ? * 1', 0, '', '{\"count\":1,\"key\":\"__default__:2:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":2}', '');
INSERT INTO `sys_task` VALUES ('2020-10-19 08:55:06.050711', '2024-01-08 10:57:06.000000', 3, '定时清空任务日志', 'SysLogClearJob.clearTaskLog', 0, 1, NULL, NULL, 0, '0 0 3 ? * 1', 0, '', '{\"count\":1,\"key\":\"__default__:3:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":3}', '');

-- ----------------------------
-- Table structure for sys_task_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_task_log`;
CREATE TABLE `sys_task_log`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `task_id` int(0) NOT NULL,
  `status` tinyint(0) NOT NULL DEFAULT 0,
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `consume_time` int(0) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_task_log
-- ----------------------------
INSERT INTO `sys_task_log` VALUES ('2023-06-12 03:00:00.671486', '2023-06-12 03:00:00.671486', 1, 3, 1, NULL, 0);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `department_id` int(0) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `head_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `psalt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint(0) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_9e7164b2f1ea1348bc0eb0a7da`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('2020-08-27 03:38:30.000000', '2022-03-28 22:52:11.845930', 1, 1, '路飞', 'rootadmin', 'ccdb5f7e5be14fe0c0528974428f79f9', '', 'https://buqiyuan.gitee.io/img/logo.jpg', 'qa894178522@qq.com', '15622472425', NULL, 'xQYCspvFb8cAW6GG1pOoUGTLqsuUSO3d', 1);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL,
  `role_id` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 67 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('2020-09-14 04:10:34.371646', '2020-09-14 04:10:34.371646', 1, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
