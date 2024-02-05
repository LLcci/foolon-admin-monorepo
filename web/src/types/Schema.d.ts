/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/admin/sys/user/create': {
    /** 创建用户 */
    post: operations['UserController_createUser']
  }
  '/admin/sys/login': {
    /** 登录 */
    post: operations['LoginController_login']
  }
  '/admin/sys/login/code': {
    /** 获取验证码 */
    get: operations['LoginController_getCode']
  }
  '/admin/sys/menu/page': {
    /** 分页菜单列表 */
    post: operations['MenuController_getMenuPageList']
  }
  '/admin/sys/menu/list': {
    /** 菜单列表 */
    post: operations['MenuController_getMenuList']
  }
  '/admin/sys/menu/save': {
    /** 保存菜单 */
    post: operations['MenuController_saveMenu']
  }
  '/admin/sys/menu/id': {
    /** id查询菜单详情 */
    get: operations['MenuController_getMenuById']
  }
  '/admin/sys/menu/delete': {
    /** id删除菜单 */
    post: operations['MenuController_deleteMenuById']
  }
  '/admin/sys/menu/routes': {
    /** 获取路由 */
    get: operations['MenuController_getRoutes']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    CreateUserDto: {
      /** @description 用户名 */
      username: string
      /** @description 密码 */
      password: string
      /** @description 姓名 */
      realname: string
      /** @description 头像 */
      avatar?: string
      /** @description 邮箱 */
      email?: string
      /** @description 手机号 */
      phone?: string
    }
    LoginDto: {
      /** @description 用户名 */
      username: string
      /** @description 密码 */
      password: string
      /** @description 验证码 */
      code: string
      /** @description 验证码id */
      codeId: string
    }
    Token: {
      /** @description Token */
      token: string
    }
    Code: {
      /** @description 验证码SVG */
      img: string
      /** @description 唯一id */
      id: string
    }
    MenuPageListDto: {
      /**
       * @description 当前页码
       * @default 1
       */
      currentPage?: number
      /**
       * @description 页大小
       * @default 10
       */
      pageSize?: number
      /** @description 名称:类型为菜单时必填 */
      name?: string
      /**
       * @description 是否启用:0-停用,1-启用
       * @default 1
       */
      status?: number
    }
    PageResultDto: Record<string, never>
    MenuEntity: {
      /** @description 菜单id,新增时不需要传,更新时需要传 */
      id?: string
      /** @description 父菜单id */
      parentId?: string
      /** @description 名称:类型为菜单时必填 */
      name?: string
      /** @description 路由页面时必填 */
      path?: string
      /** @description 路由页面时必填 */
      component?: string
      /** @description 菜单图标 */
      icon?: string
      /** @description 菜单类型:0-一级菜单,1-子菜单,2-权限 */
      menuType: number
      /** @description 类型为权限时必填 */
      perms?: string[]
      /** @description 排序 */
      sort: number
      /**
       * @description 是否缓存:0-不缓存,1-缓存
       * @default 1
       */
      keepalive?: number
      /**
       * @description 是否启用:0-停用,1-启用
       * @default 1
       */
      status?: number
    }
    MenuSaveDto: {
      /** @description 菜单列表 */
      list: components['schemas']['MenuEntity'][]
    }
    DeleteResult: Record<string, never>
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  /** 创建用户 */
  UserController_createUser: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'multipart/form-data': components['schemas']['CreateUserDto']
      }
    }
    responses: {
      201: {
        content: never
      }
    }
  }
  /** 登录 */
  LoginController_login: {
    requestBody: {
      content: {
        'application/json': components['schemas']['LoginDto']
      }
    }
    responses: {
      /** @description 登录成功 */
      200: {
        content: {
          'application/json': components['schemas']['Token']
        }
      }
    }
  }
  /** 获取验证码 */
  LoginController_getCode: {
    responses: {
      /** @description 获取验证码成功 */
      200: {
        content: {
          'application/json': components['schemas']['Code']
        }
      }
    }
  }
  /** 分页菜单列表 */
  MenuController_getMenuPageList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['MenuPageListDto']
      }
    }
    responses: {
      /** @description 分页菜单列表 */
      200: {
        content: {
          'application/json': components['schemas']['PageResultDto']
        }
      }
    }
  }
  /** 菜单列表 */
  MenuController_getMenuList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['MenuPageListDto']
      }
    }
    responses: {
      /** @description 菜单列表 */
      200: {
        content: {
          'application/json': components['schemas']['MenuEntity'][]
        }
      }
    }
  }
  /** 保存菜单 */
  MenuController_saveMenu: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['MenuSaveDto']
      }
    }
    responses: {
      /** @description 保存菜单 */
      200: {
        content: {
          'application/json': components['schemas']['MenuEntity'][]
        }
      }
    }
  }
  /** id查询菜单详情 */
  MenuController_getMenuById: {
    parameters: {
      query: {
        id: string
      }
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description id查询菜单详情 */
      200: {
        content: {
          'application/json': components['schemas']['MenuEntity']
        }
      }
    }
  }
  /** id删除菜单 */
  MenuController_deleteMenuById: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description id删除菜单 */
      200: {
        content: {
          'application/json': components['schemas']['DeleteResult']
        }
      }
    }
  }
  /** 获取路由 */
  MenuController_getRoutes: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description 获取路由 */
      200: {
        content: {
          'application/json': string[]
        }
      }
    }
  }
}
