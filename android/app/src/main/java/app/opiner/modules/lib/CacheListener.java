package app.opiner.modules.lib;

import java.io.File;

/**
 * Listener for cache availability.
 *
 * @author
 * @author
 */
public interface CacheListener {

    void onCacheAvailable(File cacheFile, String url, int percentsAvailable);
}
