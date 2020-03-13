package com.alibaba.csp.sentinel.dashboard.util;

public class IdWorkerUtils {
    private static IdWorker worker = new IdWorker(1, 1, 1);

    public static long nextId() {
        return worker.nextId();
    }

}
