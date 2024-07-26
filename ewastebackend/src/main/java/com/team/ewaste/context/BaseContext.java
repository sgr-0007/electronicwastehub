package com.team.ewaste.context;

/**
 * @author Kyle
 * @date 2024/02/27
 * <p>
 * Store and obtain ID in the current thread
 */
public class BaseContext {
    public static ThreadLocal<Long> threadLocal = new ThreadLocal<>();

    public static void setCurrentId(Long id) {
        threadLocal.set(id);
    }

    public static Long getCurrentId() {
        return threadLocal.get();
    }

    public static void removeCurrentId() {
        threadLocal.remove();
    }
}
