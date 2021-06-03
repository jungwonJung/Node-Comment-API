/**
 * @swagger
 * tags:
 *   - name: Account
 *   - name: Comment
 */
/**
 * @swagger
 *  paths:
 *    /api/create/account:
 *      post:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: "회원 가입 API, 사용자 아이디(E-mail), Password, 닉네임 3개를 입력해야 합니다."
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "data"
 *          description: ""
 *          properties:
 *              accountEmail:
 *                  type: string
 *                  required: true
 *              accountPw:
 *                  type: string
 *                  required: true
 *              accountName:
 *                  type: string
 *                  required: true
 *        responses:
 *          200:
 *            description: "[완료]가입이 정상적으로 완료되었습니다."
 *          409:
 *            description: "[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다."
 *          500:
 *            description: "[에러]서버에 문제가 있어 회원가입에 실패하였습니다."
 */
/**
 * @swagger
 *  paths:
 *    /api/login:
 *      post:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: "로그인 API 사용자의 Email 아이디와 암호를 입력해야 합니다."
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "data"
 *          description: ""
 *          required: true
 *          schema:
 *            properties:
 *                accountEmail:
 *                    type: string
 *                accountPw:
 *                    type: string
 *        responses:
 *          200:
 *            description: "[완료]로그인이 완료되었습니다"
 *          409:
 *            description: "[에러]비밀번호가 맞지 않아 로그인에 실패하였습니다"
 *          500:
 *            description: "[에러]서버에 문제가 있어 로그인하지 못했습니다"
 */
/**
 * @swagger
 *  paths:
 *    /api/write:
 *      post:
 *        tags:
 *        - "Comment"
 *        summary: ""
 *        description: "댓글 작성하기"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "body"
 *          name: "data"
 *          required: false
 *          schema:
 *            properties:
 *              text:
 *                  type: string
 *        responses:
 *          200:
 *            description: "[완료] 댓글작성이 성공 되었습니다."
 */
/**
 * @swagger
 *  paths:
 *    /api/write/recomment:
 *      post:
 *        tags:
 *        - "Comment"
 *        summary: ""
 *        description: "대댓글 작성하기"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "id"
 *          required: true
 *          schema:
 *            properties:
 *              id:
 *                  type: string
 *        - in: "body"
 *          name: "data"
 *          required: false
 *          schema:
 *            properties:
 *              text:
 *                  type: string
 *        responses:
 *          200:
 *            description: "[완료] 대댓글작성이 성공 되었습니다."
 */

/**
 * @swagger
 *  paths:
 *    /api/write/mylist:
 *      get:
 *        tags:
 *        - "Comment"
 *        summary: ""
 *        description: "내가 작성한 댓글 조회"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "next"
 *          description: "다음 페이지 해쉬 코드"
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "previous"
 *          description: "이전 페이지 해쉬 코드"
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "sort"
 *          description : "(-1, 1 오름차순 내림차순)"
 *          required: false
 *          schema:
 *            properties:
 *              sort:
 *                  type: number
 *        responses:
 *          200:
 *            description: "[검색 성공]"
 */
/**
 * @swagger
 *  paths:
 *    /api/write/list:
 *      get:
 *        tags:
 *        - "Comment"
 *        summary: ""
 *        description: "전체댓글 조회"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "query"
 *          name: "next"
 *          description: "다음 페이지 해쉬 코드"
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "previous"
 *          description: "이전 페이지 해쉬 코드"
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "sort"
 *          description : "(-1, 1 오름차순 내림차순)"
 *          required: false
 *          schema:
 *            properties:
 *              sort:
 *                  type: number
 *        responses:
 *          200:
 *            description: "[검색 성공]"
 */
/**
 * @swagger
 *  paths:
 *    /api/write/update:
 *      patch:
 *        tags:
 *        - "Comment"
 *        summary: ""
 *        description: "내 댓글 수정"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "id"
 *          description : "수정할 댓글의 _id"
 *          required: true
 *          schema:
 *            properties:
 *              id:
 *                  type: string
 *        - in: "body"
 *          name: "data"
 *          required: false
 *          schema:
 *            properties:
 *              text:
 *                  type: string
 *        responses:
 *          200:
 *            description: "[수정 성공]"
 *          500:
 *            description: "[수정 실패]"
 */
/**
 * @swagger
 *  paths:
 *    /api/write/delete:
 *      delete:
 *        tags:
 *        - "Comment"
 *        summary: ""
 *        description: "내 댓글 삭제"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "query"
 *          name: "id"
 *          description : "삭제할 댓글의 _id"
 *          required: true
 *          schema:
 *            properties:
 *              sort:
 *                  type: string
 *        responses:
 *          200:
 *            description: "[삭제 성공]"
 */
